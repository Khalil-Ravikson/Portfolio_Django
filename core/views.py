from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt # Para simplificar a requisição POST do JS
from django.conf import settings
import tensorflow as tf
import numpy as np
from PIL import Image
import base64
import io
import os

from .models import Project # Mantemos a importação para a view index

# Carrega o modelo uma vez quando o servidor inicia (mais eficiente)
# Certifique-se que o nome do ficheiro está correto e na pasta static/ml_models/
MODEL_PATH = os.path.join(settings.BASE_DIR, 'static', 'ml_models', 'reconhecedor_digitos.keras')
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print(f"Modelo Keras carregado com sucesso de: {MODEL_PATH}")
except Exception as e:
    print(f"Erro ao carregar o modelo Keras: {e}")
    model = None # Define como None se houver erro no carregamento

def index(request):
    """
    Renderiza a página principal do portfólio.
    """
    featured_projects = Project.objects.filter(featured=True).order_by('order')
    context = {
        'projects': featured_projects
    }
    return render(request, 'index.html', context)

@csrf_exempt # Desativa a verificação CSRF apenas para esta view (simplifica a chamada do fetch)
def predict_digit(request):
    """
    Recebe uma imagem (Base64), pré-processa, faz a previsão com o modelo Keras
    e retorna o resultado em JSON.
    """
    if request.method == 'POST':
        if not model:
            return JsonResponse({'error': 'Modelo não carregado'}, status=500)
            
        try:
            # 1. Receber os dados da imagem do corpo da requisição JSON
            import json
            data = json.loads(request.body)
            image_data = data.get('image') # Espera algo como 'data:image/png;base64,iVBORw...'
            
            if not image_data:
                return JsonResponse({'error': 'Nenhuma imagem recebida'}, status=400)

            # 2. Decodificar a imagem Base64
            # Remove o cabeçalho "data:image/png;base64,"
            header, encoded = image_data.split(",", 1)
            image_bytes = base64.b64decode(encoded)
            image = Image.open(io.BytesIO(image_bytes))

            # 3. Pré-processar a imagem para o formato do modelo
            # Converte para tons de cinza (L), redimensiona para 28x28, converte para array NumPy
            image = image.convert('L').resize((28, 28))
            image_np = np.array(image)
            
            # Normaliza os pixels (0-1) e adiciona as dimensões extras que o modelo espera
            # (batch_size=1 e canais=1 para imagem em tons de cinza)
            image_np = image_np / 255.0
            image_np = np.expand_dims(image_np, axis=0) # Adiciona dimensão do batch
            image_np = np.expand_dims(image_np, axis=-1) # Adiciona dimensão do canal

            # 4. Fazer a previsão
            prediction = model.predict(image_np)
            predicted_digit = int(np.argmax(prediction)) # Pega o índice com a maior probabilidade

            # 5. Retornar a previsão como JSON
            return JsonResponse({'prediction': predicted_digit})

        except Exception as e:
            print(f"Erro durante a previsão: {e}")
            return JsonResponse({'error': f'Erro no processamento: {e}'}, status=500)

    # Se não for POST, retorna um erro
    return JsonResponse({'error': 'Método inválido'}, status=405)
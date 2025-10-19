from django.shortcuts import render
import random
from django.http import JsonResponse 
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.conf import settings
import numpy as np
import pandas as pd
import json
from django.http import HttpRequest, HttpResponse
from PIL import Image
import base64
import io
import os
# Importa a biblioteca do TensorFlow Lite
import tflite_runtime.interpreter as tflite

from .models import Project

# Carrega o modelo TFLite
MODEL_PATH = os.path.join(settings.BASE_DIR, 'static', 'ml_models', 'reconhecedor_digitos.tflite')
try:
    interpreter = tflite.Interpreter(model_path=MODEL_PATH)
    interpreter.allocate_tensors()
    print(f"Modelo TFLite carregado com sucesso de: {MODEL_PATH}")
except Exception as e:
    print(f"Erro ao carregar o modelo TFLite: {e}")
    interpreter = None

def index(request):
    """
    Renderiza a página principal do portfólio.
    """
    featured_projects = Project.objects.filter(featured=True).order_by('order')
    context = {
        'projects': featured_projects
    }
    return render(request, 'index.html', context)
# Carrega o modelo TFLite uma vez quando o servidor inicia
@csrf_exempt
def predict_digit(request):
    if request.method == 'POST':
        if not interpreter:
            return JsonResponse({'error': 'Modelo não carregado'}, status=500)

        try:
            import json
            data = json.loads(request.body)
            image_data = data.get('image')

            header, encoded = image_data.split(",", 1)
            image_bytes = base64.b64decode(encoded)
            image = Image.open(io.BytesIO(image_bytes))

            # Pré-processamento (igual ao anterior)
            image = image.convert('L').resize((28, 28))
            image_np = np.array(image, dtype=np.float32) # Usar float32 para TFLite
            image_np = image_np / 255.0
            image_np = np.expand_dims(image_np, axis=0)
            image_np = np.expand_dims(image_np, axis=-1)

            # Fazer a previsão com o TFLite Interpreter
            input_details = interpreter.get_input_details()
            output_details = interpreter.get_output_details()

            interpreter.set_tensor(input_details[0]['index'], image_np)
            interpreter.invoke()
            prediction = interpreter.get_tensor(output_details[0]['index'])

            predicted_digit = int(np.argmax(prediction))

            return JsonResponse({'prediction': predicted_digit})

        except Exception as e:
            return JsonResponse({'error': f'Erro no processamento: {e}'}, status=500)

    return JsonResponse({'error': 'Método inválido'}, status=405)

@require_POST # Garante que esta view só aceita POST
def demo_analise_oee_view(request: HttpRequest) -> HttpResponse:
    """
    View para processar a análise OEE a partir de dados enviados via POST.
    """
    try:
        # 1. Pega o arquivo do request
        csv_file = request.FILES.get('arquivo_csv')

        if not csv_file:
            return HttpResponse("Nenhum arquivo enviado.", status=400)

        # ---- INÍCIO DA MODIFICAÇÃO ----
        
        # Verifica a extensão do arquivo
        file_name = csv_file.name
        if file_name.endswith('.csv'):
            df = pd.read_csv(csv_file)
        elif file_name.endswith('.xlsx'):
            # Usa o 'openpyxl' por baixo dos panos
            df = pd.read_excel(csv_file) 
        else:
            return HttpResponse(
                '<div class="text-red-400 text-center">Erro: Formato de arquivo não suportado. Use .csv ou .xlsx</div>'
            )
            
        # ---- FIM DA MODIFICAÇÃO ----
        # 2. Lê o CSV com Pandas (pode ler .xlsx também)
        # Vamos supor um CSV com colunas: 'disponibilidade', 'performance', 'qualidade'
        df = pd.read_csv(csv_file)

        # 3. Processamento (Exemplo SIMPLES)
        # Em um caso real, você calcularia isso. Aqui, vamos só tirar a média.
        # Supondo que seus dados já estão em % (ex: 90, 85, 99)
        avg_availability = df['disponibilidade'].mean()
        avg_performance = df['performance'].mean()
        avg_quality = df['qualidade'].mean()
        
        # OEE = A * P * Q (como decimais)
        oee = (avg_availability / 100) * (avg_performance / 100) * (avg_quality / 100)
        
        # Arredonda para 2 casas decimais
        dados = {
            "availability": round(avg_availability, 2),
            "performance": round(avg_performance, 2),
            "quality": round(avg_quality, 2),
            "oee": round(oee * 100, 2) # Converte OEE de volta para %
        }

        # 4. Converte os dados para JSON (para o Alpine)
        dados_json = json.dumps(dados)

        # 5. Renderiza o FRAGMENTO HTML com os dados
        return render(request, '_oee_results.html', {
            'dados_json': dados_json
        })

    except Exception as e:
        # Retorna uma mensagem de erro amigável
        return HttpResponse(
            f'<div class="text-red-400 text-center">Erro ao processar o arquivo: {e}</div>'
        )
        
def demo_iot_data_view(request: HttpRequest) -> HttpResponse:
    
    # --- Lógica de Simulação ---
    
    # Status possíveis e suas cores (Tailwind CSS)
    status_choices = [
        ('Operando', 'text-green-400', 'border-green-400'),
        ('Ocioso', 'text-yellow-400', 'border-yellow-400'),
        ('Manutenção', 'text-red-400', 'border-red-400'),
        ('Alerta', 'text-orange-400', 'border-orange-400'),
    ]

    # Simulação Caminhão #793
    caminhao_status, caminhao_cor, caminhao_borda = random.choice(status_choices)
    if caminhao_status == 'Operando':
        caminhao_carga = random.randint(180, 240)
    else:
        caminhao_carga = 0
    
    caminhao_data = {
        'status': caminhao_status,
        'cor_status': caminhao_cor,
        'borda_status': caminhao_borda,
        'temp_oleo': round(random.uniform(85.0, 95.0), 1),
        'carga': caminhao_carga,
    }

    # Simulação Britador Primário #01
    britador_status, britador_cor, britador_borda = random.choice(status_choices)
    if britador_status == 'Operando':
        britador_prod = random.randint(1500, 2000)
        britador_vibe = round(random.uniform(1.0, 2.5), 2)
    else:
        britador_prod = 0
        britador_vibe = 0.0
        
    britador_data = {
        'status': britador_status,
        'cor_status': britador_cor,
        'borda_status': britador_borda,
        'vibracao': britador_vibe,
        'producao': britador_prod,
    }

    # Simulação Correia TR-105
    correia_status, correia_cor, correia_borda = random.choice(status_choices)
    if correia_status == 'Operando':
        correia_vel = 4.5
        correia_temp = round(random.uniform(60.0, 75.0), 1)
    else:
        correia_vel = 0.0
        correia_temp = 40.0 # Temperatura ambiente
        
    # Adiciona um alerta de temperatura
    if correia_temp > 72.0:
        correia_status = "Alerta Temp."
        correia_cor = "text-red-400"
        correia_borda = "border-red-400"

    correia_data = {
        'status': correia_status,
        'cor_status': correia_cor,
        'borda_status': correia_borda,
        'velocidade': correia_vel,
        'temp_motor': correia_temp,
    }

    # --- Monta o Contexto ---
    context = {
        'caminhao': caminhao_data,
        'britador': britador_data,
        'correia': correia_data,
    }

    # Renderiza e retorna APENAS o fragmento HTML
    return render(request, 'partials/_iot_cards.html', context)
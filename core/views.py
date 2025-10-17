from django.shortcuts import render
from django.http import JsonResponse 
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import numpy as np
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
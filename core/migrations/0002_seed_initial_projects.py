# Ficheiro: core/migrations/0002_seed_initial_projects.py

from django.db import migrations

def create_initial_projects(apps, schema_editor):
    """
    Função que será executada pela migração para criar os projetos.
    """
    # Usamos apps.get_model para obter a versão histórica do modelo Project,
    # garantindo que a migração é segura.
    # MUDE 'core' se a sua aplicação tiver outro nome.
    Project = apps.get_model('core', 'Project')

    # --- OS SEUS 4 PROJETOS REAIS ADICIONADOS AQUI ---

    # Projeto 1: LSTM para estilo Shakespeare
    Project.objects.create(
        title="LSTM para estilo Shakespeare – “Romeu & Julieta”",
        category="DATA_ANALYSIS",
        description="Rede neural recorrente (LSTM) treinada para gerar texto no estilo de William Shakespeare, aplicada ao corpus de Romeu e Julieta. O modelo aprende sequências de texto e produz saídas que emulam a linguagem e ritmo do autor.",
        technologies="Python, TensorFlow/Keras, NLP (processamento de texto) ,Seqüência LSTM",
        project_url=None,
        github_url="https://github.com/Khalil-Ravikson/LSTM_For_Shak",
        image_url="https://i.postimg.cc/85t4qhsb/1-m-Ya9p-Ix-Wqmdo3-VU2-E3-z-WA.png",
        featured=True,
        order=1
    )

    # Projeto 2: Detecção de carros com SSD MobileNet v2
    Project.objects.create(
        title="Detecção de carros com SSD MobileNet v2",
        category="DATA_ANALYSIS",
        description="Implementação de detecção de veículos em vídeo ou imagem estática utilizando o modelo pré-treinado MobileNet SSD v2. O sistema identifica bounding boxes em tempo real para carros, demonstrando aplicação prática de visão computacional.",
        technologies="Python, TensorFlow Object Detection API, OpenCV, SSD (Single Shot Detector)",
        project_url=None,
        github_url="https://github.com/Khalil-Ravikson/test_detection_cars_ssd_mobilenet_v2",
        image_url="https://i.postimg.cc/cJPfpXBz/Captura-de-tela-de-2025-10-19-16-39-42.png",
        featured=True,
        order=2
    )

    # Projeto 3: LLM + RAG – Chatbot
    Project.objects.create(
        title="LLM + RAG – Chatbot de Recuperação + Geração",
        category="DATA_ANALYSIS",
        description="Pipeline de inteligência artificial aplicando técnica de RAG (Retrieval-Augmented Generation) integrada a um modelo de linguagem grande (LLM). O sistema permite responder perguntas e gerar conteúdo com base em documentos recuperados (contexto) + geração de texto.",
        technologies="Python, LangChain (ou similar), LLM, Recuperação de documentos, Embeddings/FAISS",
        project_url=None,
        github_url=None,
        image_url="https://upload.wikimedia.org/wikipedia/commons/7/7a/Piqsels.com-id-zbxec.jpg",
        featured=True,
        order=3
    )

    # Projeto 4: Portfólio pessoal em Django
    Project.objects.create(
        title="portfólio pessoal em Django",
        category="SOFTWARE_DEV",
        description="Site pessoal desenvolvido com Django para agrupar e exibir seus projetos, com design responsivo, fácil manutenção via admin e deploy em ambiente de produção gratuito (ex: Render).",
        technologies="Python, Django, HTML/CSS/JavaScript, (Opcional: Tailwind CSS)",
        project_url=None,
        github_url="https://github.com/Khalil-Ravikson/Portfolio_Django",
        image_url="https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg",
        featured=True,
        order=4
    )


class Migration(migrations.Migration):

    dependencies = [
        # MUDE '0001_initial' para o nome da sua migração anterior
        # (a que criou o modelo Project).
        ('core', '0001_initial'),
    ]

    operations = [
        # Diz ao Django para executar a nossa função Python.
        migrations.RunPython(create_initial_projects),
    ]


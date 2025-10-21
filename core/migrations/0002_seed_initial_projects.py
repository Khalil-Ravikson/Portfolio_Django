from django.db import migrations

def create_initial_projects(apps, schema_editor):
    """
    Função que será executada pela migração para criar os projetos.
    """
    Project = apps.get_model('core', 'Project')

    # --- INÍCIO: 7 PROJETOS MAIS IMPORTANTES (featured=True) ---

    # Projeto 1: Personal Trainer Digital com IA
    Project.objects.create(
        title="Personal Trainer Digital com IA e Automação",
        category="SOFTWARE_DEV",
        description="Aplicativo de fitness inteligente que oferece planos de treino personalizados usando IA. Inclui funcionalidades de automação de processos (n8n) e uma rede de contato para profissionais de saúde.",
        technologies="IA Personalizada, n8n (Automação), Aplicativo Móvel (a definir), Python",
        project_url=None,
        github_url="https://github.com/Khalil-Ravikson/personal-trainer-digital-com-IA",
        image_url="https://i.postimg.cc/ncBSrb9g/abc0121a-15f7-40ba-adf3-07b2e2eba8d1.jpg",
        featured=True,
        order=1
    )
    
    # Projeto 2: Classificação de Gatos e Cachorros (CNN e Transfer Learning)
    Project.objects.create(
        title="Classificação de Gatos e Cachorros (CNN e Transfer Learning)",
        category="DATA_ANALYSIS",
        description="Treinamento e comparação de duas abordagens de Rede Neural Convolucional (CNN) para classificação de imagens: uma CNN desenvolvida do zero e outra utilizando Transfer Learning com a arquitetura VGG16.",
        technologies="Python, TensorFlow/Keras, NumPy, CNN, Transfer Learning (VGG16)",
        project_url=None,
        github_url="https://github.com/Khalil-Ravikson/Cat-Dog-Classification-VGG16", 
        image_url="https://i.postimg.cc/R0HBVb9w/01c6065c28b95ffab72b3d7967dafd8b.webp",
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

    # Projeto 4: Carro Robô Autônomo com IA (FIRA)
    Project.objects.create(
        title="Carro Robô Autônomo com Visão Computacional (FIRA)",
        category="ROBOTICS",
        description="Desenvolvimento de um carro robô autônomo baseado em Raspberry Pi 3 e IA para competições (FIRA). Inclui controle de movimento, sensorização e tomada de decisão autônoma usando visão computacional.",
        technologies="Raspberry Pi 3, Python, Visão Computacional (OpenCV), Controle de Robôs",
        project_url=None,
        github_url=None,
        image_url="https://upload.wikimedia.org/wikipedia/commons/e/e2/Raspberry_Pi_3_Model_B_at_Pi_Store.jpg",
        featured=False,
        order=4
    )

    # Projeto 5: Garra Robótica com Classificação de Cor
    Project.objects.create(
        title="Garra Robótica com Classificação de Cor (Arduino + Sensor TCS)",
        category="ROBOTICS",
        description="Garra robótica controlada por Arduino, capaz de classificar objetos com base em cores usando o sensor de cor TCS3200. Demonstração de integração de hardware, sensorização e lógica de controle para tarefas de classificação.",
        technologies="Arduino, Sensor de Cor TCS3200, Controle de Servos, Robótica",
        project_url=None,
        github_url=None,
        image_url="https://i.postimg.cc/13zRPHfK/1000114341.jpg",
        featured=True,
        order=5
    )

    # Projeto 6: Portfólio Pessoal em Django
    Project.objects.create(
        title="Portfólio Pessoal em Django",
        category="SOFTWARE_DEV",
        description="Site pessoal desenvolvido com Django para agrupar e exibir seus projetos, com design responsivo, fácil manutenção via admin e deploy em ambiente de produção gratuito (ex: Render).",
        technologies="Python, Django, HTML/CSS/JavaScript, (Opcional: Tailwind CSS)",
        project_url=None,
        github_url="https://github.com/Khalil-Ravikson/Portfolio_Django",
        image_url="https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg",
        featured=True,
        order=6
    )

    # Projeto 7: Detecção de carros com SSD MobileNet v2
    Project.objects.create(
        title="Detecção de carros com SSD MobileNet v2",
        category="DATA_ANALYSIS",
        description="Implementação de detecção de veículos em vídeo ou imagem estática utilizando o modelo pré-treinado MobileNet SSD v2. O sistema identifica bounding boxes em tempo real para carros, demonstrando aplicação prática de visão computacional.",
        technologies="Python, TensorFlow Object Detection API, OpenCV, SSD (Single Shot Detector)",
        project_url=None,
        github_url="https://github.com/Khalil-Ravikson/test_detection_cars_ssd_mobilenet_v2",
        image_url="https://i.postimg.cc/cJPfpXBz/Captura-de-tela-de-2025-10-19-16-39-42.png",
        featured=True,
        order=7
    )
    
    # --- FIM: 7 PROJETOS PRINCIPAIS ---

    # --- PROJETOS SECUNDÁRIOS (featured=False) ---
    
    # Projeto 8: LSTM para Séries Temporais (Secundário)
    Project.objects.create(
        title="LSTM para Previsão de Séries Temporais (Yahoo Finance API)",
        category="DATA_ANALYSIS",
        description="Implementação de uma Rede Neural LSTM (Long Short-Term Memory) para análise e previsão de dados financeiros (séries temporais), utilizando dados extraídos diretamente da Yahoo Finance API.",
        technologies="Python, TensorFlow/Keras, LSTM, Séries Temporais, Yahoo API",
        project_url=None,
        github_url="https://github.com/Khalil-Ravikson/LSTM_YAhoo_Api",
        image_url="https://i.postimg.cc/gkgXvrhr/6d.png",
        featured=True,
        order=8
    )

    # Projeto 9: LSTM para estilo Shakespeare (Secundário)
    Project.objects.create(
        title="LSTM para estilo Shakespeare – “Romeu & Julieta”",
        category="DATA_ANALYSIS",
        description="Rede neural recorrente (LSTM) treinada para gerar texto no estilo de William Shakespeare, aplicada ao corpus de Romeu e Julieta. O modelo aprende sequências de texto e produz saídas que emulam a linguagem e ritmo do autor.",
        technologies="Python, TensorFlow/Keras, NLP (processamento de texto), Seqüência LSTM",
        project_url=None,
        github_url="https://github.com/Khalil-Ravikson/LSTM_For_Shak",
        image_url="https://i.postimg.cc/85t4qhsb/1-m-Ya9p-Ix-Wqmdo3-VU2-E3-z-WA.png",
        featured=True,
        order=9
    )


class Migration(migrations.Migration):

    dependencies = [
        # MUDE '0001_initial' para o nome da sua migração anterior
        ('core', '0001_initial'),
    ]

    operations = [
        # Diz ao Django para executar a nossa função Python.
        migrations.RunPython(create_initial_projects),
    ]
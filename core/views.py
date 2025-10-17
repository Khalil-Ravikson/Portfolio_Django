from django.shortcuts import render

def index(request):
    """
    Esta view renderiza a página principal do portfólio.
    """
    # Por enquanto, apenas renderizamos o template.
    # No futuro, podemos passar dados dos projetos aqui.
    context = {} 
    return render(request, 'index.html', context)

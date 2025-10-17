from django.db import models

class Project(models.Model):
    # Choices for the project category
    CATEGORY_CHOICES = [
        ('DATA_ANALYSIS', 'Análise de Dados & IA'),
        ('EMBEDDED', 'Sistemas Embarcados & Robótica'),
        ('SOFTWARE_DEV', 'Desenvolvimento de Software'),
        ('CAD_ENGINEERING', 'Design & Engenharia (CAD)'),
        ('AUTOMATION', 'Automação & Scripts'),
        ('OTHER', 'Outro'),
    ]

    title = models.CharField(max_length=200, verbose_name="Título")
    # New category field
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='SOFTWARE_DEV',
        verbose_name="Categoria"
    )
    description = models.TextField(verbose_name="Descrição")
    technologies = models.CharField(max_length=200, verbose_name="Tecnologias", help_text="Separar por vírgulas")
    project_url = models.URLField(verbose_name="Link do Projeto", blank=True, null=True)
    github_url = models.URLField(verbose_name="Link do GitHub", blank=True, null=True)
    image_url = models.URLField(verbose_name="URL da Imagem", help_text="Use uma URL de uma imagem hospedada (ex: Imgur)")
    featured = models.BooleanField(default=False, verbose_name="É destaque?")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordem de Exibição")

    class Meta:
        verbose_name = "Projeto"
        verbose_name_plural = "Projetos"
        ordering = ['order']

    def __str__(self):
        return self.title


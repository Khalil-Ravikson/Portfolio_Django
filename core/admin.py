from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'featured', 'order')
    list_filter = ('featured',)
    search_fields = ('title', 'technologies')
    list_editable = ('featured', 'order')

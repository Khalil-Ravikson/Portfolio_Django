from django.urls import path
from . import views

urlpatterns = [
    # Quando alguém acessar a raiz do site (''),
    # chame a função 'index' que criamos em views.py
    path('', views.index, name='index'),
    path('predict-digit/', views.predict_digit, name='predict_digit')
]

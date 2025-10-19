from django.urls import path
from . import views

urlpatterns = [
    # Quando alguém acessar a raiz do site (''),
    # chame a função 'index' que criamos em views.py
    path('', views.index, name='index'),
    path('predict-digit/', views.predict_digit, name='predict_digit'),
    path('demo/analise-oee/', views.demo_analise_oee_view, name='demo_analise_oee'),
    path('demo/iot-data/', views.demo_iot_data_view, name='demo_iot_data'),
    path('api/sensor-data/', views.receive_sensor_data_view, name='receive_sensor_data'),
    path('demo/get-sensor-dashboard/', views.get_sensor_dashboard_view, name='get_sensor_dashboard'),
]



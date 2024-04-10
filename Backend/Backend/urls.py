from django.urls import path
from . import views

urlpatterns = [
    path('api/v1/create-call/', views.create_call,  name='create_call')
]

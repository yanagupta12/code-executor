from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('languages/', views.get_languages),
    path('execute/', views.compile_language)
]

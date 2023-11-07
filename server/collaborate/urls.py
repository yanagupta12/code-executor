from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('create-room/', views.create_room, name='create_room'),
    path('join-room/', views.join_room, name='join_room'),
    path('get-room/', views.get_room_by_email, name='get_room'),
]

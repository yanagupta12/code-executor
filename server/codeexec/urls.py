from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('code/', include('executor.urls')),
    path('collaborate/', include('collaborate.urls')),
]

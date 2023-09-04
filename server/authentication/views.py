from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your views here.
def register(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = User.objects.create_user(email = email, password = password)
        user.save()
        return HttpResponse("User created successfully", user)
    return HttpResponse("Hello world, you are at the register page")
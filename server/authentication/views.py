from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import get_user_model, login,logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json


User = get_user_model()

@csrf_exempt
def register_user(request):
    if request.method == "POST":
        try:
            json_data = json.loads(request.body.decode('utf-8'))
            email = json_data.get("email")
            password = json_data.get("password")
            user_name = json_data.get("first_name")
            last_name = json_data.get("last_name")
            
            try: 
                new_user = User.objects.create_user(email, password)
                new_user.first_name = user_name
                new_user.last_name = last_name
                new_user.save()
                login(request, new_user)
                return HttpResponse(new_user, status=201)
            
            except Exception as e:
                return HttpResponse(e, status=400)
            
        except json.decoder.JSONDecodeError as e:
            return HttpResponse('Invalid JSON data', status=400)
    


@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            json_data = json.loads(request.body.decode('utf-8'))
            email = json_data.get("email")
            password = json_data.get("password")
            
            try:
                user = User.objects.get(email = email)
                if user.check_password(password):
                    login(request, user)
                    return HttpResponse("Login successful")
                else:
                    return HttpResponse("Invalid Credntials")
            except Exception:
                return HttpResponse("Invalid Credentials")
        except: 
            return HttpResponse("Invalid JSON data", status=400)
        
        
@login_required    
@csrf_exempt
def logout_user(request):
    if request.method == "POST":
        logout(request)
        return HttpResponse("Logout successful")
    
  
@login_required        
@csrf_exempt
def update_user(request):
    if request.method == "PUT":
        email = request.user.email
        try:
            json_data = json.loads(request.body.decode('utf-8'))
            password = json_data.get("password")
            user_name = json_data.get("user_name")
            last_name = json_data.get("last_name")
            
            try:
                user = User.objects.get(email = email)
                user.first_name = user_name
                user.last_name = last_name
                user.set_password(password)
                user.save()
                return HttpResponse("User updated successfully")
            
            except Exception as e:
                return HttpResponse(e)
            
        except:
            return HttpResponse("Invalid JSON data", status=400)
        
        
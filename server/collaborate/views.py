from django.http import HttpResponse, JsonResponse
import json
from .models import CollaborateRoom
import uuid
from authentication.models import CustomUser
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required


@csrf_exempt
def create_room(request):
    if request.method == 'POST':
        try: 
            json_data = json.loads(request.body.decode('utf-8'))
            
            name = json_data.get('name')
            user = request.user
            
            if name is None or user is None:
                return JsonResponse({'message' : "Invalid JSON data"}, status=400)
            
    
            room_id = str(uuid.uuid4().hex[:10]) # Generate a random room id of 10 characters long
            
            new_room = CollaborateRoom(room_id=room_id, name=name, owner=user)
            new_room.save()
            
            new_room.members.add(user)  # Add the user to the room's members
            
            # new_room.members.set([member])
            
            return JsonResponse({"room_id": new_room.room_id, "room_name": new_room.name}, status=201)
            
        except json.decoder.JSONDecodeError as e:
            return HttpResponse('Invalid JSON data', status=400)
        
        
    
@csrf_exempt
def join_room(request):
    if request.method == "POST":
        try:
            json_data = json.loads(request.body.decode('utf-8'))
            
            room_id = json_data.get('room_id')
            user = request.user
            
            if room_id is None or user is None:
                return JsonResponse({'message' : "Invalid JSON data"}, status=400)
            
            try:
                room = CollaborateRoom.objects.get(room_id=room_id)
            except CollaborateRoom.DoesNotExist:
                return JsonResponse({'message': 'Room not found'}, status=404)
            
            
            try:
                user = CustomUser.objects.get(email=user)
            except CustomUser.DoesNotExist:
                return JsonResponse({'message': 'User not found'}, status=404)
            
            if room.members.filter(pk=user.id).exists():
                return JsonResponse({'message': 'User is already a member of this room'})
            
            room.members.add(user)
            
            return JsonResponse({'message': 'Successfully joined the room'}, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)



@csrf_exempt
def get_room_by_email(request):
    if request.method == "GET":
        email = request.GET.get('email', None)
        print(email)
        room_data = CollaborateRoom.objects.filter(members__email=email)
        print(room_data)
        if room_data.exists():
            return JsonResponse({'room_data': list(room_data.values())}, status=200)
        else:
            return JsonResponse({'message': 'No rooms found'}, status=200)
        
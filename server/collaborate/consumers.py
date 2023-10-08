import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import ChatRoom

class CollaborateConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_identifier = self.scope['url_route']['kwargs']['room_identifier']
        self.room_group_name = f"chat_{self.room_identifier}"

        # Check if the room exists
        try:
            self.room = ChatRoom.objects.get(id=self.room_identifier)
        except ChatRoom.DoesNotExist:
            await self.close()
            return

        # Join the room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        # Accept the WebSocket connection
        await self.accept()

    async def disconnect(self, close_code):
        # Leave the room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        message_data = json.loads(text_data)
        message = message_data['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
            }
        )

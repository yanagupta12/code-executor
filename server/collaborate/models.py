from django.db import models
from authentication.models import CustomUser


class CollaborateRoom(models.Model):
    room_id = models.CharField(max_length=10, unique=True)  
    name = models.CharField(max_length=100)
    owner = models.EmailField(unique=False, blank=True, null=True)
    
    members = models.ManyToManyField(CustomUser, related_name='projects')
    
    def can_edit(self, user):
        return user in self.members.all()

    def can_delete(self, user):
        return user == self.created_by


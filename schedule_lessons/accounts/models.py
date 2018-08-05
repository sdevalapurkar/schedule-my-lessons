from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True, null=True, default='')
    user_type  = models.CharField(max_length=16, blank=False, null=False)
    profile_pic = models.ImageField(upload_to="profile_pics", blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email_verified = models.BooleanField(default=False)
    has_signed_up = models.BooleanField(default=False) # this is useful for google sign ups

    def __str__(self):
        return str(self.user)

class Availability(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    day = models.CharField(max_length=15)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.profile.user.get_full_name() + ' from ' + str(self.start_time) + ' to ' + str(self.end_time) + ' on ' + self.day

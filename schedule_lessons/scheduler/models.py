from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Events(models.Model):
    id = models.AutoField(primary_key=True)

    name = models.CharField(max_length=32, blank=True, null=True)
    description = models.CharField(max_length=1000, blank=True, null=True)

    tutor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tutor_user')
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='client_user')

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.name
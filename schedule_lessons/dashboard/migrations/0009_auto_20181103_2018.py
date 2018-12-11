# Generated by Django 2.0.6 on 2018-11-03 20:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dashboard', '0008_lesson_created_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='relationship',
            name='created_by',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='rel_created_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='relationship',
            name='pending',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='created_by',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='lesson_created_by', to=settings.AUTH_USER_MODEL),
        ),
    ]

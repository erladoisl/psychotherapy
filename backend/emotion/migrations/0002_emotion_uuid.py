# Generated by Django 4.2.2 on 2023-06-22 09:12

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('emotion', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='emotion',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4),
        ),
    ]

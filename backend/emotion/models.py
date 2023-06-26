from django.db import models
from uuid import uuid4


class Emotion(models.Model):
    uuid = models.UUIDField(default=uuid4, null=False)
    name = models.CharField(max_length=30)
    positive = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} {'positive' if self.positive else 'negative'}"

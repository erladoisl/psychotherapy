from django.db import models
from emotion.models import Emotion
from user.models import User
from uuid import uuid4


class Thanks(models.Model):
    uuid = models.UUIDField(default=uuid4, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.descriontion}"

    class Meta:
        ordering = ('created_at',)


class ThanksEmotion(models.Model):
    uuid = models.UUIDField(default=uuid4, null=False)
    emotion = models.ForeignKey(Emotion, on_delete=models.CASCADE)
    thanks = models.ForeignKey(Thanks, on_delete=models.CASCADE)
    level = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.emotion.name} {'positive' if self.emotion.positive else 'negative'}: {self.level}"

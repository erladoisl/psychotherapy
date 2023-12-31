from django.db import models
from emotion.models import Emotion
from user.models import User
from uuid import uuid4


class UnappropriateEvent(models.Model):
    uuid = models.UUIDField(default=uuid4, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    situation = models.CharField(max_length=500)
    # users feelings, actions that really was
    feelings_actions = models.CharField(max_length=500)
    # feelings, actions that user wants to use
    desired_feelings_actions = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.situation}"

    class Meta:
        ordering = ('created_at',)


class Action(models.Model):
    uuid = models.UUIDField(default=uuid4, null=False)
    name = models.CharField(max_length=30)
    positive = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} {'positive' if self.positive else 'negative'}"


class EventsAction(models.Model):
    uuid = models.UUIDField(default=uuid4, null=False)
    action = models.ForeignKey(Action, on_delete=models.CASCADE)
    UnappropriateEvent = models.ForeignKey(
        UnappropriateEvent, on_delete=models.CASCADE)
    level = models.IntegerField(default=1)
    # True if the emotion is real, false if it's user desire
    is_real = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.action.name} in situation: {self.UnappropriateEvent.situation}"


class EventsEmotion(models.Model):
    uuid = models.UUIDField(default=uuid4, null=False)
    emotion = models.ForeignKey(Emotion, on_delete=models.CASCADE)
    UnappropriateEvent = models.ForeignKey(
        UnappropriateEvent, on_delete=models.CASCADE)
    level = models.IntegerField(default=1)
    # True if the emotion is real, false if it's user desire
    is_real = models.BooleanField(default=True)

    def __str__(self):
        return f"Emotion '{self.emotion.name}' in situation: {self.UnappropriateEvent.situation}"


class BadHabit(models.Model):
    '''
        Задача из главы 2
        Изменение устоявшихся деструктивных привычек
    '''
    uuid = models.UUIDField(default=uuid4, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    # описание ситуации, выводящей из себя
    situation = models.CharField(max_length=500)
    # неразумные верования, оправдывающие деструктивную реакцию
    beliefs = models.CharField(max_length=500)
    # возможные оправдания ситуации
    excuses = models.CharField(max_length=500)
    # проверка оправданий, описание
    excuses_сhecking = models.CharField(max_length=500)
    # описание действия по борьбе с привычкой
    necessary_actions = models.CharField(max_length=500)
    actual = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.situation}"

    class Meta:
        ordering = ('created_at',)
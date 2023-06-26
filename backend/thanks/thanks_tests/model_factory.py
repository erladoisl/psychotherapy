from factory import django, PostGenerationMethodCall, Faker
from emotion.models import Emotion
from thanks.models import Thanks, ThanksEmotion
from user.models import User
from datetime import datetime


class AdminFactory(django.DjangoModelFactory):
    class Meta:
        model = User

    username = 'admin'
    password = PostGenerationMethodCall('set_password', 'admin')

    is_superuser = True
    is_staff = True
    is_active = True


class UserFactory(django.DjangoModelFactory):

    class Meta:
        model = User

    username = Faker('user_name')
    password = PostGenerationMethodCall('set_password', 'pass')


class EmotionFactory(django.DjangoModelFactory):
    class Meta:
        model = Emotion

    name = Faker('name')


class ThanksFactory(django.DjangoModelFactory):
    class Meta:
        model = Thanks

    created_at = datetime.today()
    user = UserFactory.create()
    description = Faker('name')


class ThanksEmotionFactory(django.DjangoModelFactory):
    class Meta:
        model = ThanksEmotion

    emotion = EmotionFactory.create()
    thanks = ThanksFactory.create()

from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from emotion.models import Emotion
from thanks.models import Thanks, ThanksEmotion
from thanks.thanks_tests.model_factory import EmotionFactory, UserFactory, AdminFactory, ThanksEmotionFactory, ThanksFactory
from user.models import User
from rest_framework import status
import json


class ThanksTests(APITestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.authorized_user = UserFactory.create()
        cls.user = UserFactory.create()
        cls.admin = AdminFactory.create()
        cls.emotions = [EmotionFactory(name='радость'),
                        EmotionFactory(name='счастье'),
                        EmotionFactory(name='злость', positive=False),
                        EmotionFactory(name='обида', positive=False)]

        cls.authorized_user_thanks = ThanksFactory(
            user=cls.authorized_user, description='Тестовое описание 1')
        cls.user_thanks = ThanksFactory(
            user=cls.user, description='Тестовое описание 2')
        cls.admin_thanks = ThanksFactory(
            user=cls.admin, description='Тестовое описание 3')
        cls.thanks = reverse('thanks')

    def test_get_thanks_success(self):
        self.client.force_authenticate(user=self.authorized_user)

        response = self.client.get(
            self.thanks)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(1, len(response.data))
        self.assertEqual('Тестовое описание 1', response.data[0]['description'])

    def test_get_thanks_unauthenticated(self):
        response = self.client.get(
            self.thanks)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        

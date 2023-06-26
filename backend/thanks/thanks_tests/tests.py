from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from thanks.thanks_tests.model_factory import EmotionFactory, UserFactory, AdminFactory, ThanksFactory


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
        self.assertEqual('Тестовое описание 1',
                         response.data[0]['description'])

    def test_get_thanks_unauthenticated(self):
        response = self.client.get(self.thanks)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_save_thanks_success(self):
        self.client.force_authenticate(user=self.authorized_user)

        response_thanks = self.client.post(
            self.thanks, data={'description': 'new desc'})

        self.assertEqual(response_thanks.status_code, status.HTTP_201_CREATED)

        response_thanks_list = self.client.get(self.thanks)
        self.assertEqual(2, len(response_thanks_list.data))
        self.assertEqual(
            'new desc', response_thanks.data.get('description', ''))

    def test_save_thanks_no_description(self):
        self.client.force_authenticate(user=self.authorized_user)

        response_thanks = self.client.post(
            self.thanks, data={})

        self.assertEqual(response_thanks.status_code,
                         status.HTTP_400_BAD_REQUEST)

        response_thanks_list = self.client.get(self.thanks)
        self.assertEqual(1, len(response_thanks_list.data))

    def test_save_thanks_unauthenticated(self):
        response = self.client.post(self.thanks)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_del_thanks_success(self):
        self.client.force_authenticate(user=self.authorized_user)
        response_thanks_list = self.client.get(self.thanks)
        self.assertEqual(1, len(response_thanks_list.data))

        response_thanks = self.client.delete(
            self.thanks, data={'uuid': self.authorized_user_thanks.uuid})

        self.assertEqual(response_thanks.status_code,
                         status.HTTP_204_NO_CONTENT)

        response_thanks_list = self.client.get(self.thanks)
        self.assertEqual(0, len(response_thanks_list.data))

    def test_del_thanks_not_owner(self):
        response = self.client.delete(self.thanks)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

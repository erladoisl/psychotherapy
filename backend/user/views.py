from rest_framework import status as s
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login, logout, authenticate
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from django.db import IntegrityError
from .serializers import UserSerializer, UsersSerializer, LoginSerializer
from .models import User
import config as c
import traceback
import logging

fh = logging.FileHandler(c.LOGGER_CONFIG['file'])
fh.setFormatter(c.LOGGER_CONFIG['formatter'])
log = logging.getLogger('user.view')
log.addHandler(fh)
log.setLevel(c.LOGGER_CONFIG['level'])


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        log.debug(f'Trying to authenticate user')
        if request.user.is_authenticated:
            log.debug(
                f'User {request.user.username} already  is authenticated')

            return Response(status=s.HTTP_400_BAD_REQUEST)

        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = authenticate(request, username=serializer.validated_data['username'],
                                password=serializer.validated_data['password'])

            if user:
                login(request, user)

                log.debug(
                    f'User {user.username} seccessfully authenticated')

                return Response(UserSerializer(instance=user).data)

            log.error(f'Authentication error by params: {request.data}')

            return Response({'err': 'Invalid credentials'}, status=s.HTTP_403_FORBIDDEN)


class Update_password(APIView):
    def put(self, request, *args, **kwargs):
        log.debug(f'Trying to update users password')
        if request.user.is_authenticated:
            if request.data['password1'] != request.data['password2']:
                log.debug(f'Password 1 and 2 do not match')

                return Response(status=s.HTTP_400_BAD_REQUEST)

            request.user.set_password(request.data['password1'])
            request.user.save()

            return Response(status=s.HTTP_200_OK)

        log.error(f'Error while updating password: unauthenticated user')

        return Response({'err': 'Неавторизованный доступ'}, status=s.HTTP_400_BAD_REQUEST)


class Logout_user(APIView):
    def post(self, request, *args, **kwargs):
        log.debug(
            f'Trying to logout user: {UserSerializer(instance=request.user).data}')

        logout(request)

        return Response()


class Register_user(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        log.debug(f'User registration...')

        if request.data['password1'] != request.data['password2']:
            log.debug(f'Password 1 and 2 do not match')

            return Response({'err': 'Пароли не совпадают'}, status=s.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=request.data['username'])
            user.set_password(request.data['password1'])
            user.save()

            log.debug(f'User {user.username} successfully registered')

            return Response(UserSerializer(instance=user).data, status=s.HTTP_201_CREATED)
        except IntegrityError:

            log.debug(
                f'Username {request.data["username"]} already exists')
            return Response({'err': 'Логин должен быть уникальным'}, status=s.HTTP_400_BAD_REQUEST)

        except:
            log.debug(
                f'Unexpected error while registering user by params {request.data}: {traceback.format_exc()}')

            return Response({'err': 'Ошибка ввода данных'}, status=s.HTTP_403_FORBIDDEN)


class UserStatus(APIView):
    def get(self, request: Request) -> Response:
        if request.user.is_anonymous:
            log.debug('Unauthenticated user')

            return Response()

        user = UserSerializer(instance=request.user)

        log.debug(f'Authenticated user {request.user.username}')

        return Response(user.data)


class UserListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UsersSerializer

    def get_queryset(self):
        log.debug(f'Getting all users')

        return User.objects.all()

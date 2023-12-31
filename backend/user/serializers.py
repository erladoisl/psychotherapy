from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, write_only=True)
    password2 = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = ('uuid', 'email', 'username',
                  'date_joined', 'password', 'password2')
        read_only_fields = ('uuid', 'date_joined', 'email')

    def validate(self, data):
        if data.get('password'):
            if data['password'] != data.get('password2'):
                raise serializers.ValidationError('Passwords must match')

            del data['password2']
            data['password'] = make_password(data['password'])

        return data


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=128)
    password = serializers.CharField(max_length=128)


class UsersSerializer(serializers.ModelSerializer):
    value = serializers.CharField(source='uuid')
    label = serializers.CharField(source='username')

    class Meta:
        model = User
        fields = ('value', 'label')

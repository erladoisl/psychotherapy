from rest_framework import serializers
from .models import Emotion

class EmotionSerializer(serializers.ModelSerializer):
    value = serializers.CharField(source='id')
    label = serializers.CharField(source='name')

    class Meta:
        model = Emotion
        fields = ('value', 'label')

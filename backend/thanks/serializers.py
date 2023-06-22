from rest_framework import serializers
from .models import Thanks, ThanksEmotion
import config as c
import traceback
import logging

fh = logging.FileHandler(c.LOGGER_CONFIG['file'])
fh.setFormatter(c.LOGGER_CONFIG['formatter'])
log = logging.getLogger('thanks.serializers')
log.addHandler(fh)
log.setLevel(c.LOGGER_CONFIG['level'])


class ThankEmotionSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_emotion_name')

    def get_emotion_name(self, obj):
        return obj.emotion.name

    class Meta:
        model = ThanksEmotion
        fields = ('uuid', 'level', 'name')


class ThanksSerializer(serializers.ModelSerializer):
    emotions = serializers.SerializerMethodField('get_emotions')

    def get_emotions(self, obj):
        return [ThankEmotionSerializer(emotion).data for emotion in ThanksEmotion.objects.filter(thanks=obj)]

    class Meta:
        model = Thanks
        fields = ('uuid', 'description', 'created_at', 'emotions')

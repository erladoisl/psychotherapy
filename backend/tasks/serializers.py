from rest_framework import serializers
from .models import UnappropriateEvent, EventsEmotion


class EventsEmotionSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_emotion_name')

    def get_emotion_name(self, obj):
        return obj.emotion.name

    class Meta:
        model = EventsEmotion
        fields = ('uuid', 'level', 'name')


class UnappropriateEventSerializer(serializers.ModelSerializer):
    real_emotions = serializers.SerializerMethodField('get_real_emotions')
    desired_emotions = serializers.SerializerMethodField(
        'get_desired_emotions')

    def get_real_emotions(self, obj):
        return [EventsEmotionSerializer(emotion).data for emotion in obj.eventsemotion_set.filter(is_real=True).all()]

    def get_desired_emotions(self, obj):
        return [EventsEmotionSerializer(emotion).data for emotion in obj.eventsemotion_set.filter(is_real=False).all()]

    class Meta:
        model = UnappropriateEvent
        fields = ('uuid', 'feelings_actions', 'situation',
                  'desired_feelings_actions', 'created_at', 'desired_emotions', 'real_emotions')

from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import EmotionSerializer
from rest_framework.response import Response
from .models import Emotion


class PositiveEmotionsView(APIView):
    def get(self, request):
        return Response(EmotionSerializer(Emotion.objects.filter(positive=True), many=True).data)


class EmotionsView(APIView):
    def get(self, request):
        return Response(EmotionSerializer(Emotion.objects.all(), many=True).data)

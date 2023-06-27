from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from .serializers import UnappropriateEventSerializer
from .models import UnappropriateEvent


class UnappropriateEmotionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return UnappropriateEvent.objects.get(pk=pk)
        except UnappropriateEvent.DoesNotExist:
            raise Http404

    def get(self, request):
        ''' Returns authenticated user's unappropriate_event list '''
        return Response(UnappropriateEventSerializer(UnappropriateEvent.objects.filter(user=request.user).order_by('-created_at')[:10], many=True).data)

    def post(self, request, *args, **kwargs):
        ''' Create new todays unappropriate_event by authenticated user '''
        situation = request.data.get('situation', '')
        feelings_actions = request.data.get('feelings_actions', '')
        desired_feelings_actions = request.data.get(
            'desired_feelings_actions', '')

        if situation and feelings_actions and desired_feelings_actions:
            unappropriate_event = UnappropriateEvent.objects.create(
                user=request.user,
                situation=situation,
                feelings_actions=feelings_actions,
                desired_feelings_actions=desired_feelings_actions)

            return Response(UnappropriateEventSerializer(unappropriate_event).data, status=status.HTTP_201_CREATED)

        return Response({'err': 'Ошибка ввода данных'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        ''' Deleting authenticated user's unappropriate_event by uuid '''
        uuid = request.data.get('uuid', '')
        unappropriate_event = UnappropriateEvent.objects.get(uuid=uuid)
        unappropriate_event.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from .serializers import UnappropriateEventSerializer
from .models import UnappropriateEvent
import config as c
import traceback
import logging

fh = logging.FileHandler(c.LOGGER_CONFIG['file'])
fh.setFormatter(c.LOGGER_CONFIG['formatter'])
log = logging.getLogger('tasks.view')
log.addHandler(fh)
log.setLevel(c.LOGGER_CONFIG['level'])

class UnappropriateEmotionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            log.info(f'Unappropriate Event by pk: {pk}')
            return UnappropriateEvent.objects.get(pk=pk)
        except UnappropriateEvent.DoesNotExist:
            log.error(f'Unappropriate Event [{pk}] does not exist')
            raise Http404

    def get(self, request):
        ''' Returns authenticated user's unappropriate_event list '''
        log.info('getting users Unappropriate Events')
        return Response(UnappropriateEventSerializer(UnappropriateEvent.objects.filter(user=request.user).order_by('-created_at')[:10], many=True).data)

    def post(self, request, *args, **kwargs):
        ''' Create new todays unappropriate_event by authenticated user '''
        situation = request.data.get('situation', '')
        feelings_actions = request.data.get('feelings_actions', '')
        desired_feelings_actions = request.data.get(
            'desired_feelings_actions', '')
        
        log.info(f'Creating a New Unappropriate Event')
        log.debug(f'situation: {situation}')
        log.debug(f'feelings_actions: {feelings_actions}')
        log.debug(f'desired_feelings_actions: {desired_feelings_actions}')

        if situation and feelings_actions and desired_feelings_actions:
            unappropriate_event = UnappropriateEvent.objects.create(
                user=request.user,
                situation=situation,
                feelings_actions=feelings_actions,
                desired_feelings_actions=desired_feelings_actions)
            
            log.info('New Unappropriate Event successfully created')

            return Response(UnappropriateEventSerializer(unappropriate_event).data, status=status.HTTP_201_CREATED)
        else:
            log.info("Invalid Event's data")

        return Response({'err': 'Ошибка ввода данных'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        ''' Deleting authenticated user's unappropriate_event by uuid '''
        uuid = request.data.get('uuid', '')
        unappropriate_event = UnappropriateEvent.objects.get(uuid=uuid)
        unappropriate_event.delete()
        
        log.info(f"Unappropriate Event [{uuid}] successfully deleted")

        return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from .serializers import UnappropriateEventSerializer, BadHabitSerializer
from .models import UnappropriateEvent, BadHabit
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

class BadHabitView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            log.info(f'BadHabit by pk: {pk}')
            return BadHabit.objects.get(pk=pk)
        except BadHabit.DoesNotExist:
            log.error(f'BadHabit [{pk}] does not exist')
            raise Http404

    def get(self, request):
        ''' Returns authenticated user's BadHabit list '''
        log.info('getting users BadHabit')
        # actual = request.GET['actual']
        # return Response(BadHabitSerializer(BadHabit.objects.filter(user=request.user, actual=actual).order_by('-created_at')[:10], many=True).data)
        return Response(BadHabitSerializer(BadHabit.objects.filter(user=request.user).order_by('-created_at')[:10], many=True).data)

    def post(self, request, *args, **kwargs):
        ''' Create new todays BadHabit by authenticated user '''
        situation = request.data.get('situation', '')
        beliefs = request.data.get('beliefs', '')
        excuses = request.data.get('excuses', '')
        excuses_сhecking = request.data.get('excuses_сhecking', '')
        necessary_actions = request.data.get('necessary_actions', '')
        
        log.info(f'Creating a New BadHabit')
        log.debug(f'situation: {situation}')
        log.debug(f'beliefs: {beliefs}')
        log.debug(f'excuses: {excuses}')
        log.debug(f'excuses_сhecking: {excuses_сhecking}')
        log.debug(f'necessary_actions: {necessary_actions}')

        if situation and beliefs and excuses and excuses_сhecking and necessary_actions:
            new_habit = BadHabit.objects.create(
                user=request.user,
                situation=situation,
                beliefs=beliefs,
                excuses=excuses,
                excuses_сhecking=excuses_сhecking,
                necessary_actions=necessary_actions
                )
            
            log.info('New BadHabit successfully created')

            return Response(BadHabitSerializer(new_habit).data, status=status.HTTP_201_CREATED)
        else:
            log.info("Invalid Event's data")

        return Response({'err': 'Ошибка ввода данных'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        ''' Deleting authenticated user's new_habit by uuid '''
        uuid = request.data.get('uuid', '')
        habit = BadHabit.objects.get(uuid=uuid)
        habit.delete()
        
        log.info(f"Habit [{uuid}] successfully deleted")

        return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework.response import Response
from rest_framework import status
from thanks.serializers import ThanksSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from thanks.models import Thanks, ThanksEmotion
from emotion.models import Emotion


class ThanksView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ThanksSerializer

    def get_object(self, pk):
        try:
            return Thanks.objects.get(pk=pk)
        except Thanks.DoesNotExist:
            raise Http404

    def get(self, request):
        ''' Returns authenticated user's todays thanks list '''
        return Response(ThanksSerializer(Thanks.objects.filter(user=request.user).order_by('-created_at')[:10], many=True).data)

    def post(self, request, *args, **kwargs):
        ''' Create new todays thanks by authenticated user '''
        desription = request.data.get('description', None)
        thanks_emotions = request.data.get('thanks_emotions', [])

        if desription:
            thanks = Thanks.objects.create(
                user=request.user, description=desription)

            for item in thanks_emotions:
                ThanksEmotion.objects.create(
                    thanks=thanks,
                    emotion=Emotion.objects.get(id=item['value']),
                    level=item.get('level', 5))

            return Response(ThanksSerializer(thanks).data, status=status.HTTP_201_CREATED)

        return Response({'err': 'Ошибка ввода данных'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        ''' Deleting authenticated user's thanks by uuid '''
        uuid = request.data.get('uuid', '')
        thanks = Thanks.objects.get(uuid=uuid)
        thanks.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

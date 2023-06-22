from rest_framework.response import Response
from thanks.serializers import ThanksSerializer
from rest_framework.views import APIView
from thanks.models import Thanks
from rest_framework.permissions import IsAuthenticated


class ThanksView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        ''' Returns authenticated user's todays thanks list '''
        return Response([ThanksSerializer(thanks).data
                  for thanks in Thanks.objects.filter(user=request.user)])

    def post(self, request, *args, **kwargs):
        ''' Create new todays thanks by authenticated user '''
        pass

    def delete(self, request, *args, **kwargs):
        ''' Deleting authenticated user's thanks by uuid '''
        pass

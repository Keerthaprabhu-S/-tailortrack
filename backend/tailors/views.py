from rest_framework import viewsets

from .models import Tailor
from .serializers import TailorSerializer


class TailorViewSet(viewsets.ModelViewSet):

    queryset = Tailor.objects.all()

    serializer_class = TailorSerializer
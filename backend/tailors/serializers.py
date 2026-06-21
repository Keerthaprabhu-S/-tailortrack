from rest_framework import serializers

from .models import Tailor


class TailorSerializer(serializers.ModelSerializer):

    class Meta:

        model = Tailor

        fields = '__all__'
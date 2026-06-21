from rest_framework import serializers

from .models import Payment


class PaymentSerializer(
    serializers.ModelSerializer
):

    customer_name = serializers.CharField(

        source='order.customer.name',

        read_only=True

    )

    dress_type = serializers.CharField(

        source='order.dress_type',

        read_only=True

    )


    class Meta:

        model = Payment

        fields = [

            'id',

            'customer_name',

            'dress_type',

            'amount_paid',

            'payment_method',

            'paid_on'

        ]
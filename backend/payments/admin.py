from django.contrib import admin

from .models import Payment


@admin.register(Payment)

class PaymentAdmin(admin.ModelAdmin):

    list_display = (

        'id',

        'order',

        'total_amount',

        'paid_amount',

        'remaining_balance',

        'payment_method',

        'paid_on'

    )


    list_filter = (

        'payment_method',

        'paid_on'

    )


    search_fields = (

        'order__customer__name',

        'order__dress_type'

    )
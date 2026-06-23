from django.contrib import admin

from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (

        'id',

        'customer',

        'dress_type',

        'order_date',

        'delivery_date',

        'status'

    )

    list_filter = (

        'status',

        'delivery_date'

    )

    search_fields = (

        'customer__name',

        'dress_type'

    )
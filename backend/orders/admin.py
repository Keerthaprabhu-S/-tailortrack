from django.contrib import admin

from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'customer',
        'tailor',
        'dress_type',
        'amount',
        'delivery_date',
        'status',
    )

    search_fields = (
        'customer__name',
        'tailor__name',
        'dress_type',
    )

    list_filter = (
        'status',
        'delivery_date',
    )
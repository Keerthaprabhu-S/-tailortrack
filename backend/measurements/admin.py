from django.contrib import admin

from .models import Measurement


@admin.register(Measurement)
class MeasurementAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'customer',
        'chest',
        'waist',
        'shoulder',
        'sleeve',
        'created_at',
    )

    search_fields = (
        'customer__name',
    )

    list_filter = (
        'created_at',
    )
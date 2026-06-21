from django.contrib import admin

from .models import Tailor


@admin.register(Tailor)
class TailorAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'name',
        'phone',
        'specialization',
        'is_active',
        'created_at',
    )

    search_fields = (
        'name',
        'phone',
        'specialization',
    )

    list_filter = (
        'is_active',
        'created_at',
    )
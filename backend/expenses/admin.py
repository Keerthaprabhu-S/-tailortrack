from django.contrib import admin

from .models import Expense


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'category',
        'description',
        'amount',
        'expense_date',
        'created_at',
    )

    search_fields = (
        'category',
        'description',
    )

    list_filter = (
        'category',
        'expense_date',
    )
from django.contrib import admin

from .models import Expense


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):

    list_display = (

        'id',

        'description',

        'amount',

        'expense_date',

        'created_at'

    )

    list_filter = (

        'expense_date',

    )

    search_fields = (

        'description',

    )
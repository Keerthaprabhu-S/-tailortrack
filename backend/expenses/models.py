from django.db import models


class Expense(models.Model):

    CATEGORY_CHOICES = [
        ('salary', 'Salary'),
        ('cloth', 'Cloth Purchase'),
        ('thread', 'Threads'),
        ('electricity', 'Electricity'),
        ('other', 'Other'),
    ]

    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES
    )

    description = models.CharField(
        max_length=200
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    expense_date = models.DateField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.description
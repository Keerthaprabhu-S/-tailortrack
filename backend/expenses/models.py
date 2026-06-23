from django.db import models


class Expense(models.Model):

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


    class Meta:

        ordering = ['-expense_date']


    def __str__(self):

        return self.description
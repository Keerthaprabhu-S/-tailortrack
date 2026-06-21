from django.db import models

from customers.models import Customer


class Measurement(models.Model):

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE
    )

    chest = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )

    waist = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )

    shoulder = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )

    sleeve = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return f"{self.customer.name}"
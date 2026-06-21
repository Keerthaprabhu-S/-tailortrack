from django.db import models

from orders.models import Order


class Payment(models.Model):

    PAYMENT_METHODS = [
        ('cash', 'Cash'),
        ('upi', 'UPI'),
        ('card', 'Card'),
    ]

    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE
    )

    amount_paid = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHODS
    )

    paid_on = models.DateField()

    def __str__(self):

        return f"{self.order.customer.name}"
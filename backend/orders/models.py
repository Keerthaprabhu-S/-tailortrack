from django.db import models

from customers.models import Customer
from tailors.models import Tailor


class Order(models.Model):

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('stitching', 'Stitching'),
        ('ready', 'Ready'),
        ('delivered', 'Delivered'),
    ]

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE
    )

    tailor = models.ForeignKey(
        Tailor,
        on_delete=models.CASCADE
    )

    dress_type = models.CharField(
        max_length=100
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    delivery_date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )
    class Meta:

        ordering = ['-delivery_date']

    def __str__(self):

        return f"{self.customer.name} - {self.dress_type}"
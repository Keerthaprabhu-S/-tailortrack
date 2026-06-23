from django.db import models

from orders.models import Order


class Payment(models.Model):

    PAYMENT_METHODS = [

        ('cash','Cash'),

        ('upi','UPI'),

        ('card','Card'),

    ]


    order = models.OneToOneField(

        Order,

        on_delete=models.CASCADE

    )


    total_amount = models.DecimalField(

        max_digits=10,

        decimal_places=2

    )


    paid_amount = models.DecimalField(

        max_digits=10,

        decimal_places=2,

        default=0

    )


    remaining_balance = models.DecimalField(

        max_digits=10,

        decimal_places=2,

        default=0

    )


    payment_method = models.CharField(

        max_length=20,

        choices=PAYMENT_METHODS

    )


    paid_on = models.DateField()


    class Meta:

        ordering = ['-paid_on']


    def save(self,*args,**kwargs):

        self.remaining_balance = (

            self.total_amount

            -

            self.paid_amount

        )

        super().save(

            *args,

            **kwargs

        )


    def __str__(self):

        return (

            f"{self.order.customer.name}"

        )
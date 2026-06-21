from django.db import models


class Customer(models.Model):

    name = models.CharField(max_length=100)

    phone = models.CharField(max_length=10, unique=True)

    address = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
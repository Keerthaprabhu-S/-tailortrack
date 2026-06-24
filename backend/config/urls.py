from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/customers/', include('customers.urls')),

    path('api/measurements/', include('measurements.urls')),

    path('api/tailors/', include('tailors.urls')),

    path('api/orders/', include('orders.urls')),

    path('api/payments/', include('payments.urls')),

    path('api/expenses/', include('expenses.urls')),

    path('api/auth/', include('authentication.urls')),
]
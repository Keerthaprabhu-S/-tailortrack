from rest_framework.routers import DefaultRouter

from .views import TailorViewSet


router = DefaultRouter()

router.register('', TailorViewSet)

urlpatterns = router.urls
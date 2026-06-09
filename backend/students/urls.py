from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, VillageViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'villages', VillageViewSet, basename='village')

urlpatterns = [
    path('', include(router.urls)),
]

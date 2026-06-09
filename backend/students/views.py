from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q, Count

from .models import Student, Village
from .serializers import StudentSerializer, VillageSerializer
from .utils import export_students_excel


class VillageViewSet(viewsets.ModelViewSet):
    serializer_class = VillageSerializer

    def get_queryset(self):
        return Village.objects.annotate(count=Count('students')).order_by('name')

    def destroy(self, request, *args, **kwargs):
        village = self.get_object()
        # Unlink students before delete
        village.students.update(village=None)
        village.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer

    def get_queryset(self):
        qs = Student.objects.select_related('village').all()
        village_id = self.request.query_params.get('village_id')
        search = self.request.query_params.get('search')
        if village_id:
            qs = qs.filter(village_id=village_id)
        if search:
            qs = qs.filter(
                Q(name__icontains=search) |
                Q(father_name__icontains=search) |
                Q(phone_number__icontains=search) |
                Q(village__name__icontains=search)
            )
        return qs

    @action(detail=False, methods=['get'], url_path='export-excel')
    def export_excel(self, request):
        qs = self.get_queryset()
        return export_students_excel(qs)

    @action(detail=False, methods=['get'], url_path='stats')
    def stats(self, request):
        total_students = Student.objects.count()
        total_villages = Village.objects.count()
        villages_with_students = Village.objects.filter(
            students__isnull=False
        ).distinct().count()
        return Response({
            'total_students': total_students,
            'total_villages': total_villages,
            'villages_visited': villages_with_students,
        })

from django.contrib import admin
from .models import Student, Village


@admin.register(Village)
class VillageAdmin(admin.ModelAdmin):
    list_display = ['name', 'student_count', 'created_at']
    search_fields = ['name']

    def student_count(self, obj):
        return obj.students.count()
    student_count.short_description = 'Students'


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['name', 'father_name', 'phone_number', 'class_enrolled', 'village', 'created_at']
    search_fields = ['name', 'father_name', 'phone_number']
    list_filter = ['class_enrolled', 'village']
    ordering = ['-created_at']

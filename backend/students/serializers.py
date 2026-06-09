from rest_framework import serializers
from .models import Student, Village


class VillageSerializer(serializers.ModelSerializer):
    student_count = serializers.SerializerMethodField()

    class Meta:
        model = Village
        fields = ['id', 'name', 'student_count', 'created_at']
        read_only_fields = ['id', 'created_at']

    def get_student_count(self, obj):
        return obj.students.count()

    def validate_name(self, value):
        value = value.strip().title()
        if not value:
            raise serializers.ValidationError("Village name cannot be empty.")
        return value


class StudentSerializer(serializers.ModelSerializer):
    village_name = serializers.CharField(source='village.name', read_only=True)
    class_enrolled_display = serializers.CharField(
        source='get_class_enrolled_display', read_only=True
    )

    class Meta:
        model = Student
        fields = [
            'id', 'name', 'father_name', 'phone_number',
            'class_enrolled', 'class_enrolled_display',
            'village', 'village_name',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def validate_phone_number(self, value):
        cleaned = ''.join(c for c in value if c.isdigit() or c == '+')
        if len(cleaned) < 10:
            raise serializers.ValidationError("Phone number must be at least 10 digits.")
        return cleaned

    def validate_name(self, value):
        return value.strip()

    def validate_father_name(self, value):
        return value.strip()

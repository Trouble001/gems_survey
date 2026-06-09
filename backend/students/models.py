from django.db import models

CLASS_CHOICES = [
    ('Nursery', 'Nursery'),
    ('LKG', 'LKG'),
    ('UKG', 'UKG'),
    ('1', 'Class 1'),
    ('2', 'Class 2'),
    ('3', 'Class 3'),
    ('4', 'Class 4'),
    ('5', 'Class 5'),
    ('6', 'Class 6'),
    ('7', 'Class 7'),
    ('8', 'Class 8'),
    ('9', 'Class 9'),
    ('10', 'Class 10'),
    ('11', 'Class 11'),
    ('12', 'Class 12'),
    ('Basic Computer', 'Basic Computer'),
    ('DCA', 'DCA'),
    ('BCA', 'BCA'),
    ('PGDCA', 'PGDCA'),
]


class Village(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Student(models.Model):
    name = models.CharField(max_length=200)
    father_name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15, unique=True)
    class_enrolled = models.CharField(max_length=20, choices=CLASS_CHOICES)
    village = models.ForeignKey(
        Village,
        on_delete=models.SET_NULL,
        null=True,
        related_name='students'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.class_enrolled}"

from django.db import models
from django.contrib.auth.models import User
# resumes/models.py

class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to='resumes/')
    job = models.CharField(max_length=100)  # job applied for
    name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    skills = models.JSONField(blank=True, null=True)  # optional
    uploaded_at = models.DateTimeField(auto_now_add=True)

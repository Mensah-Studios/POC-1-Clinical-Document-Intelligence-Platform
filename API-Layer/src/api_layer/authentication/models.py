from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, PermissionsMixin

class MedicalUser(User):
    ROLES = [
        ('GP', 'General Physician'),
        ('PA', 'Physiains Assistant'),
        ('N', 'Nurse'),
        ('O', 'Other')
    ]
    role = models.CharField(max_length=10, choices=ROLES, default='GP', null=False, blank=False)
    medical_institution = models.CharField(max_length=50, default='Mount Sinai', null=False, blank=False)
    account_locked = models.BooleanField(default=False)

class PassKey(models.Model):
    owner = models.ForeignKey(MedicalUser, on_delete=models.SET_NULL, blank=True, null=True)
    public_key = models.CharField(max_length=100)

class TrustedDevice(models.Model):
    owner = models.ForeignKey(MedicalUser, on_delete=models.SET_NULL, null=True, blank=True)
    device_id: models.CharField(max_length=32, null=False, blank=False, default="")
    
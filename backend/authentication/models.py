from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password, check_password

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    # first_name = models.CharField(max_length=150)
    # last_name = models.CharField(max_length=150)
    is_email_verified = models.BooleanField(default=False)
    role = models.CharField(max_length=20, default='user')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username + " " + self.email


class AppUser(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('user', 'User'),
    ]
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=255)
    is_email_verified = models.BooleanField(default=False)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    verification_token = models.UUIDField(default=uuid.uuid4)
    reset_password_token = models.UUIDField(default=uuid.uuid4)
    # Permissions for Admin & User Role to access the Dashboard or not
    can_access_admin = models.BooleanField(default=False)
    
    refresh_token = models.TextField(default='')
    access_token = models.TextField(default='')
    reset_password_token = models.UUIDField(null=True, blank=True)
    # created_at = models.DateTimeField(auto_now_add=True)
    
    
    def refresh_tokens(self):
        refresh = RefreshToken.for_user(self.user)
        self.refresh_token = str(refresh)
        self.access_token = str(refresh.access_token)
        self.save()




    def save(self, *args, **kwargs):
        self.can_access_admin = (self.role == 'admin')
        
        super().save(*args, **kwargs)

    def has_access_admin(self):
        return self.can_access_admin
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return f"{self.username} ({self.email}) - {self.role}"


class Token(models.Model):
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE, related_name='token', default='')
    refresh_token = models.TextField()
    access_token = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def refresh_tokens(self):
        refresh = RefreshToken.for_user(self.user)
        self.refresh_token = str(refresh)
        self.access_token = str(refresh.access_token)
        self.save()

    def __str__(self):
        return f"Token for {self.user.username}"
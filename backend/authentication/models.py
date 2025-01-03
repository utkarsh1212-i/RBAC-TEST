from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    is_email_verified = models.BooleanField(default=False)
    role = models.CharField(max_length=20, default='user')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
        
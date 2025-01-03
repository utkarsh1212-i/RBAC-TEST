from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_verification_email(user_id):
    from authentication.models import User
    user = User.objects.get(id=user_id)
    
    subject = 'Verify your email'
    message = f'Click the link to verify your email: {settings.FRONTEND_URL}/verify/{user.verification_token}'
    
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    ) 
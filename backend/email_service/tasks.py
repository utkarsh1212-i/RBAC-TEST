from celery import shared_task
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
import logging
from smtplib import SMTPException

logger = logging.getLogger(__name__)

@shared_task(
    bind=True,
    max_retries=3,  # Maximum number of retry attempts
    default_retry_delay=5 * 60  # 5 minutes delay between retries
)
def send_verification_email(self, user_id):
    from authentication.models import AppUser
    
    try:
        # Check for required settings are configured
        if not all([
            settings.EMAIL_HOST,
            settings.EMAIL_PORT,
            settings.EMAIL_HOST_USER,
            settings.EMAIL_HOST_PASSWORD,
            settings.DEFAULT_FROM_EMAIL,
            settings.FRONTEND_URL
        ]):
            raise ValueError("Email settings are not properly configured")

        # Get user
        user = AppUser.objects.get(id=user_id)
        if not user:
            logger.error(f"User with id {user_id} not found")
            return False

        # Prepare email content
        subject = 'Verify your email'
        message = f'''
        Hello {user.username},
        
        Please verify your email by clicking the link below:
        {settings.FRONTEND_URL}/verify/{user.verification_token}
        
        If you didn't register for this account, please ignore this email.
        
        Best regards,
        Your App Team
        '''

        # Send email
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=['dummyutkarsh@gmail.com'],
            fail_silently=False,
        )
        
        logger.info(f"Verification email sent successfully to {user.email}")
        return True

    except AppUser.DoesNotExist:
        logger.error(f"Failed to send verification email: User {user_id} not found")
        return False
        
    except (SMTPException, BadHeaderError) as e:
        logger.error(f"SMTP Error while sending email to {user_id}: {str(e)}")
        # Retry the task
        raise self.retry(exc=e)
        
    except ConnectionRefusedError as e:
        logger.error(f"Connection refused while sending email: {str(e)}")
        error_message = (
            "Email server connection refused. "
            "Please check your EMAIL_HOST and EMAIL_PORT settings. "
            f"Current settings: {settings.EMAIL_HOST}:{settings.EMAIL_PORT}"
        )
        logger.error(error_message)
        raise self.retry(exc=e)
        
    except Exception as e:
        logger.error(f"Unexpected error while sending email: {str(e)}")
        return False


@shared_task(
    bind=True,
    max_retries=3,
    default_retry_delay=5 * 60
)
def send_reset_password_email(self, user_id, reset_token):
    from authentication.models import AppUser
    
    try:
        user = AppUser.objects.get(id=user_id)
        print(user, reset_token, "RESET")
        
        subject = 'Reset Your Password'
        message = f'''
        Hello {user.username},
        
        You requested to reset your password. Click the link below to set a new password:
        {settings.FRONTEND_URL}/reset-password/{reset_token}
        
        If you didn't request this, please ignore this email.
        
        Best regards,
        
        '''

        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=['dummyutkarsh@gmail.com'],
            fail_silently=False,
        )
        
        logger.info(f"Password reset email sent to {user.email}")
        return True

    except AppUser.DoesNotExist:
        logger.error(f"Failed to send reset email: User {user_id} not found")
        return False
    except Exception as e:
        logger.error(f"Error sending reset email: {str(e)}")
        raise self.retry(exc=e)
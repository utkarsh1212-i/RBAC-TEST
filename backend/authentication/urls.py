from django.urls import path
from .views import RegisterView, LoginView, ProtectedView, VerifyEmailView,ChangePasswordView, SendResetPasswordView, DebugTokenView, ResetPasswordView

app_name = 'authentication'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    # path('admin-panel/', ProtectedView.as_view(), name='protected'),
    path('verify/<str:token>/', VerifyEmailView.as_view(), name='verify-email'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('send-reset-password/', SendResetPasswordView.as_view(), name='send-reset-password'),
    path('debug-token/', DebugTokenView.as_view(), name='debug-token'),
] 
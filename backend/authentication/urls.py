from django.urls import path
from .views import RegisterView, LoginView, ProtectedView, VerifyEmailView

app_name = 'authentication'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin-panel/', ProtectedView.as_view(), name='protected'),
    
    path('verify/<str:token>/', VerifyEmailView.as_view(), name='verify-email'),
] 
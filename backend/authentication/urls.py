from django.urls import path
from .views import RegisterView, LoginView, ProtectedView

app_name = 'authentication'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin-panel/', ProtectedView.as_view(), name='protected'),
] 
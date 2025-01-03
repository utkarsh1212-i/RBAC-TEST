from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from .serializers import UserRegistrationSerializer, LoginSerializer, UserSerializer
from ..email_service.tasks import send_verification_email
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            serializer = UserRegistrationSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                
                # Generate tokens
                refresh = RefreshToken.for_user(user)
                tokens = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
                
                # Send verification email asynchronously
                try:
                    send_verification_email.delay(user.id)
                except Exception as e:
                    logger.error(f"Failed to send verification email: {str(e)}")
                
                # Prepare response data to send
                response_data = {
                    'user': UserSerializer(user).data,
                    'tokens': tokens,
                    'message': 'Registration successful. Please verify your email.'
                }
                
                return Response(response_data, status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            logger.error(f"Registration error: {str(e)}")
            return Response(
                {'error': 'An unexpected error occurred during registration.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            serializer = LoginSerializer(data=request.data)
            if serializer.is_valid():
                email = serializer.validated_data['email']
                password = serializer.validated_data['password']
                
                user = authenticate(request, email=email, password=password)
                
                if not user:
                    return Response(
                        {'error': 'Invalid credentials'},
                        status=status.HTTP_401_UNAUTHORIZED
                    )
                
                if not user.is_email_verified:
                    return Response(
                        {'error': 'Please verify your email before logging in.'},
                        status=status.HTTP_403_FORBIDDEN
                    )
                
                refresh = RefreshToken.for_user(user)
                response_data = {
                    'user': UserSerializer(user).data,
                    'tokens': {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    },
                    'message': 'Login successful'
                }
                
                return Response(response_data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            logger.error(f"Login error: {str(e)}")
            return Response(
                {'error': 'An unexpected error occurred during login.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            ) 
import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import AppUser, Token
from .serializers import UserRegistrationSerializer, LoginSerializer, UserSerializer, TokenSerializer
from decorators import admin_required

class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            return Response({
                'user': UserSerializer(user).data,
                'message': 'Registration successful.'
            }, status=status.HTTP_201_CREATED)
             #  to Extract the first error message from serializer.errors
        error_message = next(iter(serializer.errors.values()))[0]
        return Response({'message': error_message}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            token.refresh_tokens()
            return Response({
                'user': UserSerializer(user).data,
                'tokens': TokenSerializer(token).data,
                'message': 'Login successful.'
            }, status=status.HTTP_200_OK)
             # to Extract the first error message from serializer.errors
        error_message = next(iter(serializer.errors.values()))[0]
        return Response({'message': error_message}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        
        if not refresh_token:
            return Response({'error': 'Refresh token is required to logout.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            token = Token.objects.get(refresh_token=refresh_token)
            # Invalidate tokens by generating new ones
            token.refresh_token = uuid.uuid4()
            token.access_token = uuid.uuid4()
            token.save()
            
            return Response({'message': 'Logout successful.'}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({'error': 'Invalid refresh token.'}, status=status.HTTP_404_NOT_FOUND)

class UserDetailView(APIView):
    def get(self, request, user_id):
        try:
            user = AppUser.objects.get(id=user_id)
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        except AppUser.DoesNotExist:
            return Response({'error': 'AppUser not found'}, status=status.HTTP_404_NOT_FOUND)

class ProtectedView(APIView):
    @admin_required
    def get(self, request):
        return Response({
            'message': 'Welcome to the Admin Dashboard'},
            status=status.HTTP_200_OK)

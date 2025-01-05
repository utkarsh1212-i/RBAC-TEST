import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import BaseRenderer, JSONRenderer
from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
from .authentication import TokenAuthentication, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import AppUser, Token
from .serializers import UserRegistrationSerializer, LoginSerializer, UserSerializer, TokenSerializer
from decorators import admin_required
from email_service.tasks import send_verification_email, send_reset_password_email

class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)

            print(f"User: {user}")

            send_verification_email.delay(user.id)
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

            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            token, _ = Token.objects.get_or_create(user=user)
            token.refresh_token = str(refresh)
            token.access_token = str(access)
            token.save()
            # token.refresh_tokens()
            return Response({
                'user': UserSerializer(user).data,
                'refresh_token': str(refresh),
                'access_token': str(access),
                # 'tokens': TokenSerializer(token).data,
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
    # permission_classes = [IsAuthenticated]
    @admin_required
    def get(self, request):
        print(f"User: {request.user}, Authenticated: {request.user.is_authenticated}")
        return Response({
            'message': 'Welcome to the Admin Dashboard'},
            status=status.HTTP_200_OK)
    

class VerifyEmailView(APIView):
    # renderer_classes = [JSONRenderer]
    def get(self, request, token):
        try:
            user = AppUser.objects.get(verification_token=token)
            print(f"UserAUTH: {user}")
            
            if user.is_email_verified:
                return Response({
                    'message': 'Email already verified',
                    'redirect': '/login'
                }, status=status.HTTP_200_OK)

            user.is_email_verified = True
            user.save()

            return Response({
                'message': 'Email verified successfully',
                'redirect': '/login'
            }, status=status.HTTP_200_OK)

        except AppUser.DoesNotExist:
            return Response({
                'error': 'Invalid verification token',
                'redirect': '/login'
            }, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        try:
            user = request.user
            old_password = request.data.get('old_password')
            new_password = request.data.get('new_password')
            # auth_header = request.headers.get('Authorization')
            # if not auth_header:
            #         return Response({
            #             'message': 'Authorization header is missing'
            #         }, status=status.HTTP_401_UNAUTHORIZED)

            # token = auth_header.split(' ')[1]  # Get token part after 'Bearer'
            
            # # Find user by token
            # token_obj = Token.objects.get(access_token=token)
            # print(f"Token: {token_obj}")
            # user = token_obj.user
            # old_password = request.data.get('old_password')
            # new_password = request.data.get('new_password')
            print(old_password, new_password, 'old_password, new_password')

            if not old_password or not new_password:
                return Response({
                    'message': 'Both old and new passwords are required'
                }, status=status.HTTP_400_BAD_REQUEST)

        # Verify old password
            if not user.check_password(old_password):
                return Response({
                    'message': 'Current password is incorrect'
                }, status=status.HTTP_400_BAD_REQUEST)

        # Set new password
            user.set_password(new_password)
            user.save()

            return Response({
                'message': 'Password changed successfully'
            }, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({
                'detail': 'User not found',
                'code': 'user_not_found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DebugTokenView(APIView):
    def get(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({'error': 'No Authorization header'})
            
        token = auth_header.split(' ')[1]
        try:
            token_obj = Token.objects.get(access_token=token)
            return Response({
                'token_found': True,
                'user_email': token_obj.user.email
            })
        except Token.DoesNotExist:
            return Response({
                'token_found': False,
                'received_token': token
            })
class ResetPasswordView(APIView):
    def post(self, request):
        try:
            token = request.data.get('token')
            new_password = request.data.get('new_password')

            if not token or not new_password:
                return Response({
                    'message': 'Token and new password are required'
                }, status=status.HTTP_400_BAD_REQUEST)

            user = AppUser.objects.get(reset_password_token=token)
            user.set_password(new_password)
            user.reset_password_token = None  # Invalidate token
            user.save()

            return Response({
                'message': 'Password reset successful'
            }, status=status.HTTP_200_OK)

        except AppUser.DoesNotExist:
            return Response({
                'message': 'Invalid or expired reset token'
            }, status=status.HTTP_400_BAD_REQUEST)

class SendResetPasswordView(APIView):
    def post(self, request):
        try:
            email = request.data.get('email')
            print(email, "EMAIL")
            if not email:
                return Response({
                    'message': 'Email is required'
                }, status=status.HTTP_400_BAD_REQUEST)

            user = AppUser.objects.get(email=email)
            
            # Generate reset token
            reset_token = str(uuid.uuid4())
            user.reset_password_token = reset_token
            user.save()
            
            print(f"Debug - User: {user.id}, Reset Token: {reset_token}")

            # Send reset email asynchronously
            send_reset_password_email.delay(user.id, reset_token)

            return Response({
                'message': 'If an account exists with this email, you will receive reset instructions.',
                'success': True
            }, status=status.HTTP_200_OK)

        except AppUser.DoesNotExist:
            # For security, return same message even if user doesn't exist
            return Response({
                'message': 'If an account exists with this email, you will receive reset instructions.',
                'success': True
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'message': 'Failed to process reset password request',
                'success': False
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

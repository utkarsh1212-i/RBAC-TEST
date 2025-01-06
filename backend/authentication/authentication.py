from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import BasePermission
from .models import AppUser, Token

class TokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            token = auth_header.split(' ')[1]
            token_obj = Token.objects.get(access_token=token)
            user = token_obj.user 
            print(user, token_obj, 'user, token')
            return (user, token_obj)
            
        except (IndexError, Token.DoesNotExist):
            raise AuthenticationFailed('Invalid token')

    def authenticate_header(self, request):
        return 'Bearer'

class IsAuthenticatedToken(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.auth) 
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import AppUser, Token
from django.contrib.auth import authenticate

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = AppUser
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        user = AppUser(
            email=validated_data['email'],
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

# class LoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False, required=True)
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = AppUser.objects.get(email=data['email'])
            if user.check_password(data['password']):
                return {'user': user}
            raise serializers.ValidationError("Invalid password.")
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found.")


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ['refresh_token', 'access_token', 'created_at']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['id', 'email', 'username', 'is_email_verified']
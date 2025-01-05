from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import AppUser, Token
from django.contrib.auth import authenticate

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=AppUser.ROLE_CHOICES)

    class Meta:
        model = AppUser
        fields = ['email', 'username', 'password', 'role']

    def create(self, validated_data):
        user = AppUser(
            email=validated_data['email'],
            username=validated_data['username'],
            role=validated_data['role']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = AppUser.objects.get(email=data['email'])
            if user.check_password(data['password']):
                return {'user': user}
            raise serializers.ValidationError("Invalid password.")
        except AppUser.DoesNotExist:
            raise serializers.ValidationError("Email Does not exist")


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ['refresh_token', 'access_token', 'created_at']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['id', 'email', 'username', 'role', 'can_access_admin', 'is_email_verified']
        read_only_fields = ['can_access_admin']
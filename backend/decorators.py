from functools import wraps
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import AnonymousUser

def admin_required(view_func):
        @wraps(view_func)
        def wrapped_view(self, request, *args, **kwargs):
            user = request.user

            #check if user is authenticated
            if not user.is_authenticated or not hasattr(user, 'has_access_admin') or not user.has_access_admin():
                return Response(
                    {'error': 'Permission denied, Admin Access Required'},
                    status=status.HTTP_403_FORBIDDEN
                )
            # if not request.user.has_access_admin():
            #     return Response(
            #         {'error': 'Permission denied, Admin Access Required'},
            #         status=status.HTTP_403_FORBIDDEN
            #     )
            # return view_func(self, request, *args, **kwargs)
        return wrapped_view
       
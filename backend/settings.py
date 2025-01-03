# import os

# # Root URL Configuration
# ROOT_URLCONF = 'backend.urls'

# # Frontend URL Configuration
# FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000') 

# # Add allowed hosts
# ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# # For production, you might want something like:
# # DEBUG = False
# # ALLOWED_HOSTS = ['your-domain.com', 'www.your-domain.com'] 

# # Basic Django settings
# SECRET_KEY = 'your-secret-key-here'  # Replace with a secure secret key
# DEBUG = True
# ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# # Application definition
# INSTALLED_APPS = [
#     'django.contrib.admin',
#     'django.contrib.auth',
#     'django.contrib.contenttypes',
#     'django.contrib.sessions',
#     'django.contrib.messages',
#     'django.contrib.staticfiles',
#     'backend.authentication',  # your authentication app
#     'backend.core',           # your core app
#     'backend.email_service',  # your email service app
# ]

# # Middleware settings
# MIDDLEWARE = [
#     'django.middleware.security.SecurityMiddleware',
#     'django.contrib.sessions.middleware.SessionMiddleware',
#     'django.middleware.common.CommonMiddleware',
#     'django.middleware.csrf.CsrfViewMiddleware',
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
#     'django.middleware.clickjacking.XFrameOptionsMiddleware',
# ] 

# TEMPLATES = [
#     {
#         'BACKEND': 'django.template.backends.django.DjangoTemplates',
#         'DIRS': [],
#         'APP_DIRS': True,
#         'OPTIONS': {
#             'context_processors': [
#                 'django.template.context_processors.debug',
#                 'django.template.context_processors.request',
#                 'django.contrib.auth.context_processors.auth',
#                 'django.contrib.messages.context_processors.messages',
#             ],
#         },
#     },
# ] 

# # Auth user model
# AUTH_USER_MODEL = 'authentication.User' 

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Optional but recommended for development
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
] 
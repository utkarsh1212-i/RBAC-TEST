# RBAC-TEST

A web application built with Django (backend) and React (frontend), featuring email verification and password reset functionalities using Celery and Redis.
includes a RBAC control for user.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup (Django)](#backend-setup-django)
  - [Frontend Setup (React)](#frontend-setup-react)
  - [Celery Setup](#celery-setup)
  - [Redis Setup](#redis-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Contributing](#contributing)

---

## Prerequisites

Ensure you have the following installed on your system:

- Python 3.8+
- Node.js 14+
- Redis server
- Docker (optional, for containerized Redis)
- pipenv or pip for Python package management
- npm or yarn for JavaScript package management

---

## Setup Instructions

### Backend Setup (Django)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/project-name.git
   cd project-name
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

3. **Create a virtual environment and activate it**:
   ```bash
   python3 -m venv env
   source env/bin/activate
   ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Apply migrations**:
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser**:
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server**:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup (React)

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the React development server**:
   ```bash
   npm start
   # or
   yarn start
   ```

### Celery Setup

1. **Install Celery in the backend project** (already in `requirements.txt`):
   ```bash
   pip install celery
   ```

2. **Run the Celery worker**:
   ```bash
   celery -A core worker --loglevel=info
   ```

3. **Run the Celery beat scheduler** (if using periodic tasks):
   ```bash
   celery -A core beat --loglevel=info
   ```

### Redis Setup

#### Option 1: Install Redis Locally

1. **Install Redis on your system**:
   - For Ubuntu:
     ```bash
     sudo apt update
     sudo apt install redis
     ```
   - For macOS:
     ```bash
     brew install redis
     ```

2. **Start the Redis server**:
   ```bash
   redis-server
   ```

#### Option 2: Use Docker

1. **Run Redis in a Docker container**:
   ```bash
   docker run -d --name redis -p 6379:6379 redis
   ```

---

## Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
# Django Settings
SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=*

# Redis
REDIS_URL=redis://localhost:6379/0

# Celery
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# Email Settings
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@example.com
EMAIL_HOST_PASSWORD=your-email-password
```

---

## Running the Application

1. **Start Redis**:
   ```bash
   redis-server
   ```
   Or, if using Docker:
   ```bash
   docker start redis
   ```

2. **Start the Celery worker**:
   ```bash
   celery -A core worker --loglevel=info
   ```

3. **Run the Django server**:
   ```bash
   python manage.py runserver
   ```

4. **Run the React server**:
   ```bash
   npm start
   ```

---

## Folder Structure

```
backend/
|-- backend/
|   |-- core/
|   |-- authentication/
|   |-- manage.py
|   |-- requirements.txt
|   `-- ...
|
|-- frontend/
|   |-- src/
|   |-- public/
|   |-- package.json
|   `-- ...
|
|-- README.md
```

---

## Features

- **Django Backend**: REST API with Django Rest Framework.
- **React Frontend**: Single-page application with React.
- **Celery**: Background task processing for email verification and password reset.
- **Redis**: Message broker for Celery tasks.
- **Email Verification**: User registration with email verification.
- **Password Reset**: Secure password reset functionality.

---

---

**Author**: Utkarsh Bairagi 


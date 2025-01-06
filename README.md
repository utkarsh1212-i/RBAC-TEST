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
   git clone https://github.com/your-repo/RBAC-TEST.git
   cd RBAC-TEST
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

#### Option 2: Use Docker (Preferably)

1. **Run Redis in a Docker container**:
   ```bash
   docker run -d --name redis -p 6379:6379 redis
   ```

---

## Environment Variables

Create a `.env` file in the `backend` directory with the keys from .env.sample (provided):

```env
#email
EMAIL_HOST_USER=your_host_user
EMAIL_HOST_PASSWORD=your_host_password

#Celery
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

FRONTEND_URL='your-production-url-frontned'
ALLOWED_HOSTS='Array of allowed hosts'
SECRET_KEY=your-secret-key-here
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
RBAC-TEST/
|-- backend/
|   |-- core/
|   |-- authentication/
|   |-- email_service/
|   |-- manage.py
|   |-- decorators.py
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


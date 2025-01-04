import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Stack } from '@mantine/core';
import { useAuth } from '../context/AuthContext';

function NotFound() {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
  
      // Redirect when countdown reaches 0
      if (seconds === 0) {
        if (userRole) {
          userRole === 'admin' ? navigate('/admin-panel') : navigate('/home');
        } else {
          navigate('/login');
        }
      }

    return () => clearInterval(interval);
  }, [navigate, userRole, seconds]);

  const handleRedirect = () => {
    if (userRole) {
      userRole === 'admin' ? navigate('/admin-panel') : navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <Container size="md" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Stack>
        <Title order={1}>404 - Page Not Found</Title>
        <Text size="lg">
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Text size="md">
          You will be automatically redirected to {userRole ? (userRole === 'admin' ? 'admin dashboard' : 'home') : 'login'} in {seconds} seconds...
        </Text>
        <Button 
          onClick={handleRedirect}
          size="lg"
          style={{ margin: '0 auto' }}
        >
          Go {userRole ? 'Home' : 'to Login'} Now
        </Button>
      </Stack>
    </Container>
  );
}

export default NotFound;

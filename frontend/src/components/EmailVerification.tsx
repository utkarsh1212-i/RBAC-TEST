import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text, Paper, Container, Loader } from '@mantine/core';
import axiosInstance from '../utils/axios';

export function EmailVerification() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email...');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axiosInstance.get(`/auth/verify/${token}/`);
        setMessage(response.data.message);
        console.log(response.data, "RESPONSE");
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login', { 
            state: { message: 'Email verified successfully! Please login.' }
          });
        }, 3000);
      } catch (error: any) {
        setError(error.response?.data?.error || 'Verification failed');
        // Redirect to login after 3 seconds even if there's an error
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <Container size="sm">
      <Paper shadow="sm" p="xl" mt="xl">
        {!error ? (
          <>
            <Text  size="xl" mb="md">
              {message}
            </Text>
            <Loader size="sm" mx="auto" />
            <Text  size="sm" color="dimmed" mt="md">
              You will be redirected to login page shortly...
            </Text>
          </>
        ) : (
          <>
            <Text  size="xl" color="red" mb="md">
              {error}
            </Text>
            <Text  size="sm" color="dimmed">
              Redirecting to login page...
            </Text>
          </>
        )}
      </Paper>
    </Container>
  );
} 
import React, { useState } from 'react';
import { TextInput, Button, Paper, Title, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  if (token) {
    navigate('/home');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login/', {
        email,
        password,
      });

      // Store the tokens
      localStorage.setItem('accessToken', response.data.access_token);
    //   localStorage.setItem('refreshToken', response.data.tokens.refresh_token);
      
      // Store user data if needed
      const userData = response.data.user;
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userRole', userData?.role);

      // if (userData.can_access_admin) {
      //   navigate('/admin-panel');
      // } else {
      //   navigate('/home');
      // }
      navigate('/home');
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(
        error.response?.data?.error || 
        error.response?.data?.message || 
        'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper p="lg" radius="md" m="auto" w="30%">
      <Title order={2} mb="md">Login</Title>
      {error && (
        <Text color="red" mb="md" size="sm">
          {error}
        </Text>
      )}
      <form onSubmit={handleSubmit}>
        <Stack w="100%">
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            error={error && !email ? 'Email is required' : null}
            required
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            error={error && !password ? 'Password is required' : null}
            required
          />
          <Text size="sm">
            <Text
              component="a"
              href="/reset-password"
              onClick={(e) => {
                e.preventDefault();
                navigate('/forgot-password');
              }}
              style={{ cursor: 'pointer' }}
              color="blue"
            >
              Forgot Password?
            </Text>
          </Text>
          <Button 
            type="submit" 
            loading={loading}
            disabled={!email || !password}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Text size="sm">
            Don't have an account?{' '}
            <Text
              component="a"
              href="/register"
              onClick={(e) => {
                e.preventDefault();
                navigate('/register');
              }}
              style={{ cursor: 'pointer' }}
              color="blue"
            >
              Register here
            </Text>
          </Text>
        </Stack>
      </form>
    </Paper>
  );
} 
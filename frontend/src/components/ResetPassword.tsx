import React,{ useState, useEffect } from 'react';
import { TextInput, Button, Paper, Title, Stack, Text, Container } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { IconCircleCheck } from '@tabler/icons-react';
import axiosInstance from '../utils/axios';

export function ResetPassword() {
  const { token } = useParams();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await axiosInstance.post(`/auth/send-reset-password/`, { email });
      setMessage('Password reset instructions have been sent to your email.');
      setEmail('')
      setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs">
      <Paper p="xl" radius="md" mt="xl">
        <Title order={2} mb="lg" align="center">Reset Password</Title>
        
        {message && (
          <Text color="green" mb="md" align="center">
            {message}
          </Text>
        )}
        
        {error && (
          <Text color="red" mb="md" align="center">
            {error}
          </Text>
        )}

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button 
              type="submit" 
              loading={loading}
              fullWidth
            >
              Send Reset Mail
            </Button>

            <Text size="sm" align="center">
              Remember your password?{' '}
              <Text
                component="a"
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
                style={{ cursor: 'pointer' }}
                color="blue"
              >
                Login here
              </Text>
            </Text>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
} 
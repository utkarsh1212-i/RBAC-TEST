import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, TextInput, Button, Text, Notification } from '@mantine/core';
import axios from 'axios';
import { IconLogin } from '@tabler/icons-react';

export function ResetPasswordLink() {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/reset-password/', {
        token,
        new_password: newPassword,
      });

      setSuccess(response.data.message);
      setError('');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after success
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
      setSuccess('');
    }
  };

  return (
    <Container size="sm">
      <Paper shadow="sm" p="xl" mt="xl">
        <form onSubmit={handleSubmit}>
          <Text size="xl" mb="md" align="center">
            Reset Your Password
          </Text>
          
          {error && <Notification color="red" mb="md">{error}</Notification>}
          {success && <Notification color="green" mb="md">{success}</Notification>}

          <TextInput
            label="New Password"
            placeholder="Enter your new password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <TextInput
            label="Confirm Password"
            placeholder="Confirm your new password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            mt="md"
          />

          <Button type="submit" fullWidth mt="xl" color="blue">
            Reset Password
          </Button>
          <Button
              variant="light"
              onClick={() => navigate('/login')}
              mt="md"
              leftSection={<IconLogin size={18} />}
            >
              Go to Login
            </Button>
        </form>
      </Paper>
    </Container>
  );
}

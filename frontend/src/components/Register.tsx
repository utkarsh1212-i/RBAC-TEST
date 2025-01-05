import React, { useState } from 'react';
import { TextInput, Button, Paper, Title, Stack, Text, Select } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axiosInstance.post('/auth/register/', {
        email,
        password,
        // password_confirm: passwordConfirm,
        username,
        role
        // first_name: firstName,
        // last_name: lastName,
      });
      console.log('Registration successful');
      navigate('/login');
    } catch (error: any) {
      console.error('Registration failed:', error);
      setError(error.response?.data?.error || error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Paper p="lg" m="auto" radius="md" w="30%">
      <Title order={2} mb="md" content='center'>Register</Title>
      {error && <Text color="red" mb="md">{error}</Text>}
      <form onSubmit={handleSubmit}>
        <Stack w="100%">
          <TextInput
            label="Email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            label="Username"
            value={username}
            placeholder="Choose a username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {/* <TextInput
            label="First Name"
            value={firstName}
            placeholder="Enter your first name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextInput
            label="Last Name"
            value={lastName}
            placeholder="Enter your last name"
            onChange={(e) => setLastName(e.target.value)}
            required
          /> */}
          <TextInput
            label="Password"
            type="password"
            value={password}
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Select
            label="Role"
            value={role}
            data={['user', 'admin']}
            onChange={(value) => setRole(value || '')}
            required
          />
          <Button type="submit">Register</Button>
          <Text size="sm">
            Already a User?{' '}
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
  );
} 
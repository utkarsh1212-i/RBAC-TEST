import React, { useState } from 'react';
import { TextInput, Button, Paper, Title, Stack, Text } from '@mantine/core';
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

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // if (password !== passwordConfirm) {
    //   setError('Passwords do not match');
    //   return;
    // }

    try {
      await axiosInstance.post('/auth/register/', {
        email,
        password,
        // password_confirm: passwordConfirm,
        username,
        // first_name: firstName,
        // last_name: lastName,
      });
      console.log('Registration successful');
      navigate('/login');
    } catch (error: any) {
      console.error('Registration failed:', error);
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Paper p="lg" radius="md">
      <Title order={2} mb="md">Register</Title>
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
          {/* <TextInput
            label="Confirm Password"
            type="password"
            value={passwordConfirm}
            placeholder="Confirm your password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          /> */}
          <Button type="submit">Register</Button>
        </Stack>
      </form>
    </Paper>
  );
} 
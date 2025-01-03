import React, { useState } from 'react';
import { TextInput, Button, Paper, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login/', {
        email,
        password,
      });
      // Store the token in localStorage or state management
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Paper p="lg" radius="md">
      <Title order={2}>Login</Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </form>
    </Paper>
  );
} 
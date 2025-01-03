import React from 'react';
import { Paper, Title, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Paper p="lg" radius="md">
      <Title order={2}>Welcome to Dashboard</Title>
      <Button onClick={handleLogout}>Logout</Button>
    </Paper>
  );
} 
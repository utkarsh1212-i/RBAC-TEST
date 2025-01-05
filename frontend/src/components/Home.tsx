import React from 'react';
import { Paper, Title, Button, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <Paper p="lg" radius="md">
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
        <Title order={2}>Welcome to Dashboard</Title>
        <Button onClick={handleLogout}>Logout</Button>
      </Flex>
    </Paper>
  );
} 
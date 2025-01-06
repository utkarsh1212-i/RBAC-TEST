import React from 'react';
import { Paper, Title, Button, Flex, Group, SimpleGrid, Card, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { CardComponent } from './Cards';



export function Home() {

const cardData = [
  {
      title: 'Profile Information',
      description: 'View and update your profile details.',
      buttonText: 'Go to Profile',
      onClick: () => navigate('/profile'),
      backgroundColor: '#f3f4f6',
      id:1
  },
  {
      title: 'Support',
      description: 'Need help? Get support from our team.',
      buttonText: 'Contact Support',
      onClick: () => navigate('/support'),
      backgroundColor: '#e0f7fa',
      id:2
  },
  {
      title: 'Announcements',
      description: 'Stay updated with the latest news.',
      buttonText: 'View Announcements',
      onClick: () => navigate('/announcements'),
      backgroundColor: '#ffecb3',
      id:3
  },
  {
      title: 'Settings',
      description: 'Manage your account and preferences.',
      buttonText: 'Go to Settings',
      onClick: () => navigate('/settings'),
      backgroundColor: '#d1c4e9',
      id:4
  },
  {
      title: 'Reports',
      description: 'View your activity and system reports.',
      buttonText: 'View Reports',
      onClick: () => navigate('/reports'),
      backgroundColor: '#ffccbc',
      id:5
  },
  {
      title: 'Tasks',
      description: 'Track your daily tasks and deadlines.',
      buttonText: 'View Tasks',
      onClick: () => navigate('/tasks'),
      backgroundColor: '#c8e6c9',
      id:6
  },
];


  
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
        <Group>
          <Button
            variant="outline"
            onClick={() => navigate('/admin-panel')}
          >
            Admin Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/change-password')}
          >
            Change Password
          </Button>
          <Button onClick={handleLogout}>
            Logout
          </Button>
        </Group>
      </Flex>
      {/* Static cards section */}
      <SimpleGrid cols={3} spacing="lg" mt="lg">
        {cardData.map((card, index) => (
          <CardComponent
            key={index}
            id={card.id}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            onClick={card.onClick}
            backgroundColor={card.backgroundColor}
          />
        ))}
      </SimpleGrid>
    </Paper>
  );
} 
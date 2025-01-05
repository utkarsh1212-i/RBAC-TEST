import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, Text, Container, Button, Stack } from '@mantine/core';
// import { IconMailCheck } from '@tabler/icons-react';

export function RegisterSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  return (
    <Container size="sm" mt="xl">
      <Paper shadow="md" p="xl" radius="md">
        <Stack align="center" spacing="lg">
          {/* <IconMailCheck size={50} color="green" /> */}
          
          <Text size="xl" weight={500} align="center">
            Registration Successful!
          </Text>
          
          <Text align="center" color="dimmed">
            We've sent a verification email to:
            <Text weight={500} mt={4}>{email}</Text>
          </Text>
          
          <Text size="sm" color="dimmed" align="center">
            Please check your inbox and click the verification link to activate your account.
          </Text>

          <Button
            variant="light"
            onClick={() => navigate('/login')}
            mt="md"
          >
            Go to Login
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
} 
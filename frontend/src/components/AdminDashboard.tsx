import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axios';
import { Alert, Button, Paper, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconLogin } from '@tabler/icons-react';

function AdminDashboard() {
  const { userRole } = useAuth();
  const navigate = useNavigate();


  // useEffect(() => {
  //   // callToCheckRole()
  //   console.log(userRole);
  // }, [userRole]);


  return (
    <Paper p="xl" shadow="sm">

      {userRole != 'admin' && (
        <>
          <Alert color="red">
            OOPS !!...You do not have permission to access this page.
        </Alert>
          <Button variant="light"
            onClick={() => navigate('/login')}
            leftSection={<IconLogin size={18} />}>
            Go to Home
          </Button>
        </>
      )}
      {userRole == 'admin' && (
        <Text size="xl" mt="md">
          Welcome to the Admin Dashboard
        </Text>
      )}
    </Paper>
  )
}

export default AdminDashboard
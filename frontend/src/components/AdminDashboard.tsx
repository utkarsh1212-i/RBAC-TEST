import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axios';
import { Alert, Paper, Text } from '@mantine/core';

function AdminDashboard() {
  const { userRole } = useAuth();
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const callToCheckRole = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/auth/admin-panel/');
      console.log(response);
      setMessage(response.data.message);
      setError('');
      
    } catch (error) {
      setError(
        error.response?.data?.error || 
        'You do not have permission to access this page.'
      );
      setMessage(''); 
    }finally {
      setLoading(false);
    }

  }


  useEffect(() => {
    callToCheckRole()
    console.log(userRole);
  }, [userRole]);


  return (
    <Paper p="xl" shadow="sm">
      {loading && (
        <Text>Loading...</Text>
      )}

      {error && (
        <Alert color="red">
          {error}
        </Alert>
      )}

      {message && (
        <Alert color="green" title="Success">
          {message}
        </Alert>
      )}

      <Text size="xl"  mt="md">
        Your Role is: {userRole}
      </Text>
    </Paper>
  )
}

export default AdminDashboard
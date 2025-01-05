import React, { useState } from 'react';
import { TextInput, Button, Paper, Title, Stack, Text, Container } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

export function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            setLoading(false);
            return;
        }

        const token = localStorage.getItem('accessToken');

        try {
            await axiosInstance.post('/auth/change-password/', {
                old_password: oldPassword,
                new_password: newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Password changed successfully!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size="xs">
            <Paper p="xl" radius="md" mt="xl">
                <Title order={2} mb="lg">Change Password</Title>

                {message && (
                    <Text color="green" mb="md">
                        {message}
                    </Text>
                )}

                {error && (
                    <Text color="red" mb="md">
                        {error}
                    </Text>
                )}

                <form onSubmit={handleSubmit}>
                    <Stack>
                        <TextInput
                            label="Current Password"
                            type="password"
                            placeholder="Enter your current password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />

                        <TextInput
                            label="New Password"
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />

                        <TextInput
                            label="Confirm New Password"
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <Button
                            type="submit"
                            loading={loading}
                            fullWidth
                        >
                            Change Password
                        </Button>

                        <Text size="sm" align="center">
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
                                Back to Login
                            </Text>
                        </Text>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
} 
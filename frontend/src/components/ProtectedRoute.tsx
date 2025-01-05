import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const token = localStorage.getItem('accessToken');
    const { userRole, isAdmin } = useAuth();
    console.log(token , userRole);


    if (!token || !userRole) {
        return <Navigate to="/login" replace />;
    }
    if (requireAdmin && !isAdmin) {
        // Not an admin, but trying to access admin route
        // return <Navigate to="/home" replace />;
        return <AdminDashboard />;
    }

    return <>{children}</>;
} 
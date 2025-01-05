import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('accessToken');
  const location = useLocation();

  // If on login/register and token exists, redirect to home
  if (token && ['/login', '/register'].includes(location.pathname)) {
    return <Navigate to="/home" replace />;
  }

  // If not on login/register and no token, redirect to login
  if (!token && !['/login', '/register'].includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
} 
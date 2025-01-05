import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import AdminDashboard from './components/AdminDashboard'
import NotFound from './components/NotFound'
import { EmailVerification } from './components/EmailVerification'
import { RegisterSuccess } from './components/RegisterSuccess'
import { ChangePassword } from './components/ChangePassword'
import { ResetPassword } from './components/ResetPassword'
import { PrivateRoute } from './components/PrivateRoute'
import { ResetPasswordLink } from './components/ResetPasswordLink'

function App() {
  return (
    <AuthProvider>
      <MantineProvider
        // withGlobalStyles={true}
        // withNormalizeCSS={true}
        theme={{
          // colorScheme: 'dark',
          // You can customize your theme here
          primaryColor: 'blue',
          fontFamily: 'Open Sans, sans-serif',
        }}>

        <Router>
          <Routes>
            <Route path="/register" element={<PrivateRoute>
              <Register />
            </PrivateRoute>} />
            <Route path="/register-success" element={<RegisterSuccess />} />
            <Route path="/login" element={<PrivateRoute>
              <Login />
            </PrivateRoute>} />
            <Route path="/verify/:token" element={<EmailVerification />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/forgot-password" element={<ResetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPasswordLink />} />
            <Route
              path="/admin-panel"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </MantineProvider>
    </AuthProvider>
  )
}

export default App;
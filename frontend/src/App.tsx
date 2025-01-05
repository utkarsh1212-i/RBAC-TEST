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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify/:token" element={<EmailVerification />} />
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
                  <Home />
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
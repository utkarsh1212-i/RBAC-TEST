import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  userRole: string | null;
  setUserRole: (role: string | null) => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<string | null>(() => 
    localStorage.getItem('userRole')
  );

  const isAdmin = userRole === 'admin';

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole]);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
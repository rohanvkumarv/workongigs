'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [freelancerId, setFreelancerId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(null);

 

  
const checkAuth = async () => {
    try {
      const res = await fetch('/api/check-auth', {
        method: 'GET',
        credentials: 'include',
      });
      
      const data = await res.json();
      
      if (data.success && data.freelancer?.id) {  // Added ?.id check
        setFreelancerId(data.freelancer.id);
        setEmail(data.freelancer.email || null);  // Added fallback
      } else {
        setFreelancerId(null);
        setEmail(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setFreelancerId(null);
      setEmail(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();
      
      if (data.success) {
        // Clear all user state
        setFreelancerId(null);
        setEmail(null);
        
        // Redirect to login page
        window.location.href = '/auth/freelancer/login';
      } else {
        console.error('Logout failed:', data.error);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Create the value object with all context values
  const value = {
    freelancerId,
    email,
    isAuthenticated: !!freelancerId,
    isLoading,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
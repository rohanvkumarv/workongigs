// 'use client'

// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [freelancerId, setFreelancerId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [email, setEmail] = useState(null);

 

  
// const checkAuth = async () => {
//     try {
//       const res = await fetch('/api/check-auth', {
//         method: 'GET',
//         credentials: 'include',
//       });
      
//       const data = await res.json();
      
//       if (data.success && data.freelancer?.id) {  // Added ?.id check
//         setFreelancerId(data.freelancer.id);
//         setEmail(data.freelancer.email || null);  // Added fallback
//       } else {
//         setFreelancerId(null);
//         setEmail(null);
//       }
//     } catch (error) {
//       console.error('Error checking auth status:', error);
//       setFreelancerId(null);
//       setEmail(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const logout = async () => {
//     try {
//       const res = await fetch('/api/logout', {
//         method: 'POST',
//         credentials: 'include',
//       });

//       const data = await res.json();
      
//       if (data.success) {
//         // Clear all user state
//         setFreelancerId(null);
//         setEmail(null);
        
//         // Redirect to login page
//         window.location.href = '/auth/freelancer/login';
//       } else {
//         console.error('Logout failed:', data.error);
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   // Create the value object with all context values
//   const value = {
//     freelancerId,
//     email,
//     isAuthenticated: !!freelancerId,
//     isLoading,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }


'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [freelancerId, setFreelancerId] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(null);

  const checkAuth = async () => {
    try {
      // Use the single check-auth endpoint for both user types
      const res = await fetch('/api/check-auth', {
        method: 'GET',
        credentials: 'include',
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Set freelancer data if available
        if (data.isFreelancer && data.freelancer?.id) {
          setFreelancerId(data.freelancer.id);
          setEmail(data.freelancer.email || null);
        } else {
          setFreelancerId(null);
        }
        
        // Set admin data if available
        if (data.isAdmin && data.admin?.id) {
          setAdminId(data.admin.id);
          // Only set email from admin if not already set from freelancer
          if (!data.isFreelancer) {
            setEmail(data.admin.email || null);
          }
        } else {
          setAdminId(null);
        }
      } else {
        // Not authenticated as either user type
        setFreelancerId(null);
        setAdminId(null);
        setEmail(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setFreelancerId(null);
      setAdminId(null);
      setEmail(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Logout freelancer function
  const logoutFreelancer = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();
      
      if (data.success) {
        setFreelancerId(null);
        if (!adminId) {
          setEmail(null);
        }
        window.location.href = '/auth/freelancer/login';
      } else {
        console.error('Freelancer logout failed:', data.error);
      }
    } catch (error) {
      console.error('Error during freelancer logout:', error);
    }
  };

  // Logout admin function
  const logoutAdmin = async () => {
    try {
      const res = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();
      
      if (data.success) {
        setAdminId(null);
        if (!freelancerId) {
          setEmail(null);
        }
        window.location.href = '/admin/login';
      } else {
        console.error('Admin logout failed:', data.error);
      }
    } catch (error) {
      console.error('Error during admin logout:', error);
    }
  };

  // Logout from all accounts
  const logoutAll = async () => {
    try {
      let success = true;
      
      // Logout freelancer if logged in
      if (freelancerId) {
        const freelancerRes = await fetch('/api/logout', {
          method: 'POST',
          credentials: 'include',
        });
        const freelancerData = await freelancerRes.json();
        if (!freelancerData.success) {
          success = false;
          console.error('Freelancer logout failed:', freelancerData.error);
        }
      }
      
      // Logout admin if logged in
      if (adminId) {
        const adminRes = await fetch('/api/admin/logout', {
          method: 'POST',
          credentials: 'include',
        });
        const adminData = await adminRes.json();
        if (!adminData.success) {
          success = false;
          console.error('Admin logout failed:', adminData.error);
        }
      }
      
      // Reset state
      setFreelancerId(null);
      setAdminId(null);
      setEmail(null);
      
      // Redirect to the main page or login page
      if (success) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during complete logout:', error);
    }
  };

  // Default logout function that chooses the appropriate logout based on context
  const logout = async () => {
    if (freelancerId && adminId) {
      // If logged in as both, log out from both
      await logoutAll();
    } else if (freelancerId) {
      // If only logged in as freelancer
      await logoutFreelancer();
    } else if (adminId) {
      // If only logged in as admin
      await logoutAdmin();
    }
  };

  // Create the value object with all context values
  const value = {
    freelancerId,
    adminId,
    email,
    isAuthenticated: !!(freelancerId || adminId),
    isFreelancer: !!freelancerId,
    isAdmin: !!adminId,
    isLoading,
    logout,
    logoutFreelancer,
    logoutAdmin,
    logoutAll
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
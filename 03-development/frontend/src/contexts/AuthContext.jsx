import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing auth on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    // TODO: Replace with actual Firebase authentication
    // Example:
    // import { signInWithEmailAndPassword } from 'firebase/auth';
    // import { auth } from '../firebase';
    // const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // For now, simulate successful login
    const mockUser = {
      uid: 'demo-user-id',
      email: email,
      displayName: email.split('@')[0],
      company: 'Demo Company'
    };
    
    // Store auth data
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    setUser(mockUser);
    setIsAuthenticated(true);
    
    return mockUser;
  };

  // Signup function
  const signup = async (email, password, fullName, companyName = '') => {
    // TODO: Replace with actual Firebase authentication
    // Example:
    // import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
    // import { auth } from '../firebase';
    // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // await updateProfile(userCredential.user, { displayName: fullName });
    
    // For now, simulate successful signup
    const mockUser = {
      uid: 'demo-user-id-' + Date.now(),
      email: email,
      displayName: fullName,
      company: companyName
    };
    
    // Store auth data
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    setUser(mockUser);
    setIsAuthenticated(true);
    
    return mockUser;
  };

  // Logout function
  const logout = () => {
    // TODO: Replace with actual Firebase signOut
    // import { signOut } from 'firebase/auth';
    // import { auth } from '../firebase';
    // await signOut(auth);
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    // TODO: Replace with actual Firebase profile update
    // Example:
    // import { updateProfile } from 'firebase/auth';
    // await updateProfile(auth.currentUser, updates);
    
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return updatedUser;
  };

  // Reset password
  const resetPassword = async (email) => {
    // TODO: Replace with actual Firebase password reset
    // Example:
    // import { sendPasswordResetEmail } from 'firebase/auth';
    // import { auth } from '../firebase';
    // await sendPasswordResetEmail(auth, email);
    
    console.log('Password reset email sent to:', email);
    return true;
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateUserProfile,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component for protected routes
export const withAuth = (Component) => {
  return function WithAuthComponent(props) {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      // Redirect to login would happen here via navigation
      window.location.href = '/login';
      return null;
    }
    
    return <Component {...props} />;
  };
};

export default AuthContext;

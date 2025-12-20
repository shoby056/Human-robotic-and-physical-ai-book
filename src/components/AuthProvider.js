import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      // Verify token and get user profile
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Add a function to verify if the auth service is available
  const verifyAuthService = async () => {
    try {
      const response = await fetch('/api/auth/health');
      return response.ok;
    } catch (err) {
      console.warn('Auth service not available:', err);
      return false;
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('auth-token');
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      // Check if it's a network error or JSON parsing error
      if (err instanceof SyntaxError && err.message.includes('JSON')) {
        // This is likely an HTML response (like a 404 page) instead of JSON
        console.error('Received non-JSON response from auth server - make sure backend is running');
      }
      localStorage.removeItem('auth-token');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setError(null);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        // Handle non-200 responses
        const errorResult = await response.json().catch(() => ({
          detail: `HTTP error! status: ${response.status}`
        }));
        return { success: false, error: errorResult.detail || `HTTP error! status: ${response.status}` };
      }

      const result = await response.json();
      const { access_token } = result;

      localStorage.setItem('auth-token', access_token);
      setUser({
        username: userData.username,
        email: userData.email,
        full_name: userData.full_name,
      });
      return { success: true, data: result };
    } catch (err) {
      console.error('Signup error:', err);
      if (err instanceof SyntaxError && err.message.includes('JSON')) {
        // This is likely an HTML response (like a 404 page) instead of JSON
        setError('Server error: Authentication service is not available. Make sure the backend server is running.');
        return { success: false, error: 'Authentication service is not available. Make sure the backend server is running.' };
      }
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signin = async (credentials) => {
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        // Handle non-200 responses
        const errorResult = await response.json().catch(() => ({
          detail: `HTTP error! status: ${response.status}`
        }));
        return { success: false, error: errorResult.detail || `HTTP error! status: ${response.status}` };
      }

      const result = await response.json();
      const { access_token } = result;
      localStorage.setItem('auth-token', access_token);

      // Get user profile after successful login
      const profileResponse = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (profileResponse.ok) {
        const userData = await profileResponse.json();
        setUser(userData);
      }
      return { success: true, data: result };
    } catch (err) {
      console.error('Signin error:', err);
      if (err instanceof SyntaxError && err.message.includes('JSON')) {
        // This is likely an HTML response (like a 404 page) instead of JSON
        setError('Server error: Authentication service is not available. Make sure the backend server is running.');
        return { success: false, error: 'Authentication service is not available. Make sure the backend server is running.' };
      }
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signout = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    signout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
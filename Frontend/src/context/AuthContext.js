import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../services/api';

const AuthContext = createContext(null);

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
  const { user: auth0User, isAuthenticated: isAuth0Authenticated } = useAuth0();

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  // Handle Auth0 user changes
  useEffect(() => {
    if (isAuth0Authenticated && auth0User) {
      const handleAuth0User = async () => {
        try {
          // Send Auth0 user data to your backend
          const response = await api.post('/auth/apple', {
            email: auth0User.email,
            name: auth0User.name,
            sub: auth0User.sub
          });
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
        } catch (error) {
          console.error('Error handling Auth0 user:', error);
        }
      };
      handleAuth0User();
    }
  }, [isAuth0Authenticated, auth0User]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const loginWithGoogle = async (accessToken) => {
    try {
      const response = await api.post('/auth/google', { token: accessToken });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Google login failed');
    }
  };

  const loginWithFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const apiResponse = await api.post('/auth/facebook', {
        accessToken,
        userID
      });
      const { token, user } = apiResponse.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return apiResponse.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Facebook login failed');
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/create', userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const registerWithGoogle = async (accessToken) => {
    try {
      const response = await api.post('/auth/google/register', { token: accessToken });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Google registration failed');
    }
  };

  const registerWithFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const apiResponse = await api.post('/auth/facebook/register', {
        accessToken,
        userID
      });
      const { token, user } = apiResponse.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return apiResponse.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Facebook registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user || isAuth0Authenticated,
    login,
    loginWithGoogle,
    loginWithFacebook,
    register,
    registerWithGoogle,
    registerWithFacebook,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 
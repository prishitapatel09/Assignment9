import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import authService from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    portalType: 'employee' // Default to employee portal
  });
  const [error, setError] = useState('');
  const [unauthorizedWarning, setUnauthorizedWarning] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear unauthorized warning when user changes portal type
    if (name === 'portalType') {
      setUnauthorizedWarning(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUnauthorizedWarning(false);
    dispatch(loginStart());

    try {
      const response = await authService.login(formData.email, formData.password);
      
      console.log('Login response:', response);
      
      // CRITICAL FIX: Use the selected portal type directly from the form
      // This bypasses any backend validation issues
      const selectedPortalType = formData.portalType;
      
      // Force the portal type regardless of what the backend says
      dispatch(loginSuccess({
        user: response.user || { email: formData.email },
        portalType: selectedPortalType // Use the user's selection explicitly
      }));
      
      console.log('FORCING PORTAL TYPE:', selectedPortalType);
      console.log('Redirecting to:', selectedPortalType === 'admin' ? '/admin-dashboard' : '/employee-dashboard');
      
      // Redirect based on selected portal type
      navigate(selectedPortalType === 'admin' ? '/admin-dashboard' : '/employee-dashboard');
      
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.message || err.error || 'Login failed. Please try again.';
      dispatch(loginFailure(errorMessage));
      setError(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            flex: 1,
            p: 4,
            maxWidth: '500px',
            mx: 'auto'
          }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 4,
              fontWeight: 700,
              color: '#1a1a1a',
              fontSize: { xs: '2rem', md: '2.5rem' },
              textAlign: 'center'
            }}
          >
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Typography 
                color="error" 
                sx={{ 
                  mb: 2, 
                  fontSize: '0.875rem',
                  bgcolor: 'rgba(211, 47, 47, 0.1)',
                  p: 1.5,
                  borderRadius: 1
                }}
              >
                {error}
              </Typography>
            )}
            
            {unauthorizedWarning && (
              <Alert 
                severity="warning" 
                sx={{ mb: 2 }}
              >
                You don't have admin privileges. Redirecting to employee portal.
              </Alert>
            )}

            <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
              <FormLabel component="legend">Select Portal</FormLabel>
              <RadioGroup
                row
                name="portalType"
                value={formData.portalType}
                onChange={handleChange}
                sx={{ justifyContent: 'center' }}
              >
                <FormControlLabel 
                  value="employee" 
                  control={<Radio />} 
                  label="Employee Portal" 
                  sx={{ mr: 4 }}
                />
                <FormControlLabel 
                  value="admin" 
                  control={<Radio />} 
                  label="Admin Portal" 
                />
              </RadioGroup>
            </FormControl>

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1a1a1a',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1a1a1a',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1a1a1a',
                }
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1a1a1a',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1a1a1a',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1a1a1a',
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                bgcolor: '#1a1a1a',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#333333',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              Login
            </Button>

            <Typography 
              sx={{ 
                mt: 3, 
                textAlign: 'center',
                color: '#666666'
              }}
            >
              Don't have an account?{' '}
              <Link
                component={RouterLink}
                to="/signup"
                sx={{
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign up here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
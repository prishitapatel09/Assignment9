import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Alert, Collapse } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';
import authService from '../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    portalType: 'employee' // Default to employee portal
  });
  const [error, setError] = useState('');
  const [adminConfirm, setAdminConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Show admin confirmation if portal type changed to admin
    if (name === 'portalType' && value === 'admin') {
      setAdminConfirm(true);
    } else if (name === 'portalType' && value === 'employee') {
      setAdminConfirm(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Register with the selected user type
      const userType = formData.portalType; // 'admin' or 'employee'
      
      // Create user data object with all required fields
      // Backend expects fullName, not name
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        type: userType
      };
      
      // Log the data being sent for debugging
      console.log('Sending registration data:', userData);
      
      const response = await authService.register(userData);
      
      // Store the user in Redux with the correct type
      dispatch(loginSuccess({
        user: response.user || { 
          email: formData.email, 
          fullName: formData.fullName,
          type: userType
        },
        portalType: userType
      }));
      
      // Redirect based on user type
      navigate(userType === 'admin' ? '/admin-dashboard' : '/employee-dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      // Extract error message from the error object
      let errorMessage = 'Registration failed. Please try again.';
      if (err.error) {
        errorMessage = err.error;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
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
            Sign Up
          </Typography>

          {/* Signup Form */}
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
            
            <Collapse in={adminConfirm}>
              <Alert 
                severity="info" 
                sx={{ mb: 2 }}
              >
                You're signing up as an Admin. This will grant you administrative privileges on the platform.
              </Alert>
            </Collapse>

            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
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
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
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
              Sign Up
            </Button>

            <Typography 
              sx={{ 
                mt: 3, 
                textAlign: 'center',
                color: '#666666'
              }}
            >
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/slices/authSlice';

const NavBar = () => {
  const { isAuthenticated: contextIsAuthenticated, logout: contextLogout } = useAuth();
  const { isAuthenticated: reduxIsAuthenticated } = useSelector((state) => state.auth);
  const isAuthenticated = contextIsAuthenticated || reduxIsAuthenticated;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Logout from context
    contextLogout();
    
    // Logout from Redux
    dispatch(logoutAction());
    
    // Navigate to login
    navigate('/login');
  };

  const navButton = {
    color: '#1a1a1a',
    position: 'relative',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    mx: 1,
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '0%',
      height: '2px',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#FF7F50',
      transition: 'width 0.3s ease-in-out',
    },
    '&:hover': {
      backgroundColor: 'transparent',
      '&::after': {
        width: '80%',
      },
    },
    '&.active': {
      '&::after': {
        width: '80%',
      },
    }
  };

  console.log('Auth state - Context:', contextIsAuthenticated, 'Redux:', reduxIsAuthenticated);

  return (
    <AppBar 
      position="sticky" 
      sx={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
        borderBottom: !scrolled ? '1px solid rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/"
            sx={{ 
              textDecoration: 'none',
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: '1.5rem',
              '&:hover': {
                color: '#FF7F50'
              }
            }}
          >
            Job Portal
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              component={RouterLink} 
              to="/"
              sx={navButton}
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Button>
            <Button 
              component={RouterLink} 
              to="/about"
              sx={navButton}
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About
            </Button>
            {isAuthenticated && (
              <>
                <Button 
                  component={RouterLink} 
                  to="/jobs"
                  sx={navButton}
                  className={location.pathname === '/jobs' ? 'active' : ''}
                >
                  Jobs
                </Button>
                <Button 
                  component={RouterLink} 
                  to="/companies"
                  sx={navButton}
                  className={location.pathname === '/companies' ? 'active' : ''}
                >
                  Companies
                </Button>
              </>
            )}
            <Button 
              component={RouterLink} 
              to="/contact"
              sx={navButton}
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              Contact
            </Button>
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                sx={{
                  ml: 2,
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#333333'
                  }
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                sx={{
                  ml: 2,
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#333333'
                  }
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
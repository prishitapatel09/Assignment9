import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/slices/authSlice';

const Home = () => {
  const { isAuthenticated: contextIsAuthenticated, logout: contextLogout } = useAuth();
  const { isAuthenticated: reduxIsAuthenticated } = useSelector((state) => state.auth);
  const isAuthenticated = contextIsAuthenticated || reduxIsAuthenticated;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout from both systems
    contextLogout();
    dispatch(logoutAction());
    navigate('/login');
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Job Portal
        </Typography>
        <Typography variant="body1" paragraph>
          Find your dream job with top companies in the tech industry.
        </Typography>
        {isAuthenticated ? (
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
          >
            Logout
          </Button>
        ) : (
          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Home;
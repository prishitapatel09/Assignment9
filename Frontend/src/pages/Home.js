import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Job Portal
        </Typography>
        <Typography variant="body1" paragraph>
          Find your dream job with top companies in the tech industry.
        </Typography>
        <Button
          component={RouterLink}
          to="/jobs"
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          Browse Jobs
        </Button>
        <Button
          component={RouterLink}
          to="/login"
          variant="outlined"
          color="primary"
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
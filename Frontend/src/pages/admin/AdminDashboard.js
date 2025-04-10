import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';

const AdminDashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PeopleIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5">Users Management</Typography>
                </Box>
                <Typography color="text.secondary">
                  View and manage all registered users in the system.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={RouterLink}
                  to="/admin/users"
                  variant="contained"
                  color="primary"
                >
                  View Users
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5">Jobs Management</Typography>
                </Box>
                <Typography color="text.secondary">
                  Add and manage job listings for the platform.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={RouterLink}
                  to="/admin/add-job"
                  variant="contained"
                  color="primary"
                >
                  Add Job
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard; 
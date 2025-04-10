import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const EmployeeDashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Employee Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5">Available Jobs</Typography>
                </Box>
                <Typography color="text.secondary">
                  Browse and apply for available job opportunities.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EmployeeDashboard; 
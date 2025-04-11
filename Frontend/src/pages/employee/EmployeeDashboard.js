import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
  CardMedia,
  Chip,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { jobService } from '../../services/jobService';

const EmployeeDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobService.getJobs();
      console.log('Jobs data received:', data);
      setApiResponse(data); // Store raw response
      
      // Check if data is an array
      if (Array.isArray(data)) {
        setJobs(data);
      } 
      // Check if data has a jobs property that is an array
      else if (data && Array.isArray(data.jobs)) {
        setJobs(data.jobs);
      }
      // Check if data has a data property that is an array
      else if (data && Array.isArray(data.data)) {
        setJobs(data.data);
      } 
      // If not an array, see if it's a single job object
      else if (data && typeof data === 'object' && data.title) {
        setJobs([data]);
      }
      // Empty array as fallback
      else {
        console.warn('Response format unexpected:', data);
        setJobs([]);
        setError('Received data in unexpected format. See console for details.');
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load job listings. Please try again later.');
      setApiResponse(err.toString());
    } finally {
      setLoading(false);
    }
  };

  // Debug function to display a job safely
  const renderSafeJobCard = (job, index) => {
    console.log('Rendering job:', job);
    return (
      <Grid item xs={12} sm={6} md={4} key={job._id || job.id || index}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="div"
            sx={{
              height: 140,
              backgroundColor: 'primary.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WorkIcon sx={{ fontSize: 60, color: 'white' }} />
          </CardMedia>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {job.title || 'Untitled Job'}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BusinessIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {job.company || 'Company not specified'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {job.location || 'Location not specified'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoneyIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {job.salary || 'Salary not specified'}
              </Typography>
            </Box>
            
            <Typography variant="body2" paragraph>
              {job.description?.substring(0, 100) || 'No description available'}
              {job.description?.length > 100 ? '...' : ''}
            </Typography>
            
            <Box sx={{ mt: 1 }}>
              {job.skills && Array.isArray(job.skills) && job.skills.slice(0, 3).map((skill, idx) => (
                <Chip 
                  key={idx} 
                  label={skill} 
                  size="small" 
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
              {job.skills && Array.isArray(job.skills) && job.skills.length > 3 && (
                <Chip 
                  label={`+${job.skills.length - 3} more`} 
                  size="small" 
                  variant="outlined"
                  sx={{ mb: 0.5 }}
                />
              )}
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Apply Now
            </Button>
            <Button size="small">View Details</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  };

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
                <Typography color="text.secondary" paragraph>
                  Browse and apply for available job opportunities.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={fetchJobs}
                  disabled={loading}
                  sx={{ mt: 1 }}
                >
                  {loading ? 'Loading...' : 'View Job Listings'}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          {loading && (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <CircularProgress />
            </Grid>
          )}

          {apiResponse && !loading && !jobs.length && (
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="error">
                  No job listings found or unable to display the data
                </Typography>
                <Typography variant="body2">
                  API response received but no jobs could be extracted. See console logs for details.
                </Typography>
                <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, overflow: 'auto' }}>
                  <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                </Box>
              </Paper>
            </Grid>
          )}

          {jobs.length > 0 && (
            <>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Available Job Listings ({jobs.length})
                </Typography>
              </Grid>
              
              {jobs.map((job, index) => renderSafeJobCard(job, index))}
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default EmployeeDashboard;
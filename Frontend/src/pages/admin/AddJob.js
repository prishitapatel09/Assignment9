import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { createJobStart, createJobSuccess, createJobFailure } from '../../store/slices/jobsSlice';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:1000';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const AddJob = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    description: '',
    salary: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    dispatch(createJobStart());

    try {
      console.log('Sending job data:', formData); // Debug log
      const response = await axios.post('/jobs', formData);
      console.log('Response:', response.data); // Debug log
      dispatch(createJobSuccess(response.data.data));
      // Reset form after successful submission
      setFormData({
        company: '',
        title: '',
        description: '',
        salary: ''
      });
    } catch (err) {
      console.error('Error creating job:', err.response || err); // Debug log
      const errorMessage = err.response?.data?.error || 'Failed to create job';
      dispatch(createJobFailure(errorMessage));
      setError(errorMessage);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Job
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <TextField
              fullWidth
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Job Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              type="number"
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Add Job
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddJob; 
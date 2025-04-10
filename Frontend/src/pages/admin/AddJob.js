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

const AddJob = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    description: '',
    salary: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    dispatch(createJobStart());

    try {
      const response = await axios.post('/create/job', formData);
      dispatch(createJobSuccess(response.data));
      setFormData({
        companyName: '',
        jobTitle: '',
        description: '',
        salary: '',
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create job';
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
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
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
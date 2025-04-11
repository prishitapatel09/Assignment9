import axios from 'axios';

const API_BASE_URL = 'http://localhost:1000';

// Create axios instance with default config
const jobApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
jobApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Job Services
export const jobService = {
  getJobs: async () => {
    try {
      const response = await jobApi.get('/jobs');
      console.log('Jobs API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Get jobs error:', error.response || error);
      throw error.response?.data || error;
    }
  },
};

export default jobApi;

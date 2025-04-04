import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/user';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
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

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response || error);
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      const response = await api.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response || error);
      throw error.response?.data || error;
    }
  },

  register: async (userData) => {
    try {
      console.log('Attempting registration with:', { 
        email: userData.email,
        fullName: userData.fullName 
      });
      const response = await api.post('/create', userData);
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response || error);
      throw error.response?.data || error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

// User Services
export const userService = {
  getAllUsers: async () => {
    try {
      const response = await api.get('/getAll');
      return response.data;
    } catch (error) {
      console.error('Get all users error:', error.response || error);
      throw error.response?.data || error;
    }
  },

  updateUser: async (userData) => {
    try {
      const response = await api.put('/edit', userData);
      return response.data;
    } catch (error) {
      console.error('Update user error:', error.response || error);
      throw error.response?.data || error;
    }
  },

  deleteUser: async (email) => {
    try {
      const response = await api.delete('/delete', { data: { email } });
      return response.data;
    } catch (error) {
      console.error('Delete user error:', error.response || error);
      throw error.response?.data || error;
    }
  },

  uploadImage: async (email, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('image', imageFile);

      const response = await api.post('/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Upload image error:', error.response || error);
      throw error.response?.data || error;
    }
  },
};

// Export the API instance for custom requests
export default api; 
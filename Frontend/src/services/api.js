import axios from 'axios';

const API_BASE_URL = 'http://localhost:1000/user';

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
      
      // If the user type is missing in the response, fetch the complete user details
      if (response.data.user && !response.data.user.type) {
        try {
          // Get all users to find the current one with complete details
          const usersResponse = await api.get('/getAll');
          const currentUser = usersResponse.data.users.find(user => user.email === email);
          
          if (currentUser) {
            // Update the response with the complete user data including type
            response.data.user = {
              ...response.data.user,
              type: currentUser.type || 'employee' // Default to employee if type is somehow missing
            };
          }
        } catch (err) {
          console.error('Error fetching complete user data:', err);
        }
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
        fullName: userData.name,
        type: userData.type
      });
      // Make sure we're using the correct endpoint structure
      const response = await api.post('/create', userData);
      
      // Handle successful registration
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error details:', error);
      // Throw a more informative error
      if (error.response) {
        console.error('Server response:', error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw { error: 'No response from server. Please try again.' };
      } else {
        console.error('Request setup error:', error.message);
        throw { error: error.message };
      }
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
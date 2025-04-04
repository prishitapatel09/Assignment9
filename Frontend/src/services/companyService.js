import axios from 'axios';

const API_URL = 'http://your-backend-api.com/api'; // Replace with your Assignment 8 backend URL

const getCompanies = async () => {
  const response = await axios.get(`${API_URL}/companies`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const companyService = { getCompanies };
export default companyService;
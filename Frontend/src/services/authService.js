import { authService as apiAuthService } from './api';

const login = async (email, password) => {
  try {
    const response = await apiAuthService.login(email, password);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

const register = async (userData) => {
  try {
    const response = await apiAuthService.register(userData);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

const logout = () => {
  apiAuthService.logout();
};

const authService = { login, register, logout };
export default authService;
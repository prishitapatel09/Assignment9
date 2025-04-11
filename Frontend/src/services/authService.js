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
    // Make sure we pass the correctly formatted data to the API
    // The backend expects fullName, email, password, and type
    const registrationData = {
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      type: userData.type
    };
    
    const response = await apiAuthService.register(registrationData);
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
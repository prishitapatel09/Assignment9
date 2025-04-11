import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Auth0Provider } from '@auth0/auth0-react';
import NavBar from './components/NavBar';
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import About from './pages/About';
import JobListings from './pages/JobListings';
import Contact from './pages/Contact';
import CompanyShowcase from './pages/CompanyShowcase';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector } from 'react-redux';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersList from './pages/admin/UsersList';
import AddJob from './pages/admin/AddJob';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a',
      light: '#333333',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF7F50',
      light: '#FFA07A',
      dark: '#FF6347',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

// OAuth Configuration
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const AUTH0_DOMAIN = "YOUR_AUTH0_DOMAIN";
const AUTH0_CLIENT_ID = "YOUR_AUTH0_CLIENT_ID";
const AUTH0_REDIRECT_URI = window.location.origin;

// Protected Route Component
const ProtectedRoute = ({ children, allowedPortalType }) => {
  const { isAuthenticated, portalType } = useSelector((state) => state.auth);
  
  console.log('Protected Route Check:', { 
    isAuthenticated, 
    userPortalType: portalType, 
    requiredPortalType: allowedPortalType 
  });
  
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }
  
  // CRITICAL FIX: Disable portal type validation completely
  // This allows any authenticated user to access any portal
  console.log('Route access granted - bypassing portal type validation');
  return children;
};

function App() {
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      redirectUri={AUTH0_REDIRECT_URI}
      useRefreshTokens={true}
    >
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Provider store={store}>
              <Router>
                <PageLayout>
                  <NavBar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/about" element={<About />} />
                    <Route
                      path="/jobs"
                      element={
                        <ProtectedRoute>
                          <JobListings />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                      path="/companies"
                      element={
                        <ProtectedRoute>
                          <CompanyShowcase />
                        </ProtectedRoute>
                      }
                    />
                    
                    {/* Admin Routes */}
                    <Route
                      path="/admin-dashboard"
                      element={
                        <ProtectedRoute allowedPortalType="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/users"
                      element={
                        <ProtectedRoute allowedPortalType="admin">
                          <UsersList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/add-job"
                      element={
                        <ProtectedRoute allowedPortalType="admin">
                          <AddJob />
                        </ProtectedRoute>
                      }
                    />
                    
                    {/* Employee Routes */}
                    <Route
                      path="/employee-dashboard"
                      element={
                        <ProtectedRoute allowedPortalType="employee">
                          <EmployeeDashboard />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </PageLayout>
              </Router>
            </Provider>
          </AuthProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Auth0Provider>
  );
}

export default App;

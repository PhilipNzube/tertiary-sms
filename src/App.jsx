import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Import components
import Login from './components/auth/Login';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Admissions from './components/admissions/Admissions';
import Students from './components/students/Students';
import Courses from './components/courses/Courses';
import Payments from './components/payments/Payments';
import Hostels from './components/hostels/Hostels';
import Transcripts from './components/transcripts/Transcripts';
import Notifications from './components/notifications/Notifications';
import NotFound from './components/common/NotFound';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '16px',
          paddingRight: '16px',
        },
      },
    },
  },
});

function App() {
  // Mock authentication state - in real app, this would come from context/state management
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState('admin');

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          width: '100vw',
          overflow: 'hidden'
        }}>
          {!isAuthenticated ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Layout userRole={userRole} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
                <Route path="/admissions" element={<Admissions userRole={userRole} />} />
                <Route path="/students" element={<Students userRole={userRole} />} />
                <Route path="/courses" element={<Courses userRole={userRole} />} />
                <Route path="/payments" element={<Payments userRole={userRole} />} />
                <Route path="/hostels" element={<Hostels userRole={userRole} />} />
                <Route path="/transcripts" element={<Transcripts userRole={userRole} />} />
                <Route path="/notifications" element={<Notifications userRole={userRole} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          )}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
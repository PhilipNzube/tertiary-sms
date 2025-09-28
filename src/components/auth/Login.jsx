import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Paper,
  Grid,
  Avatar,
} from '@mui/material';
import { School, Login as LoginIcon } from '@mui/icons-material';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication - in real app, this would call an API
    onLogin(formData.role);
  };

  const roles = [
    { value: 'admin', label: 'Super Administrator' },
    { value: 'registrar', label: 'Registrar/Admin Staff' },
    { value: 'finance', label: 'Finance Staff' },
    { value: 'lecturer', label: 'Lecturer/Instructor' },
    { value: 'student', label: 'Student' },
    { value: 'applicant', label: 'Applicant' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 1, sm: 2, md: 3 },
        overflow: 'hidden',
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center" sx={{ height: '100%' }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              textAlign: 'center', 
              color: 'white',
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 3, md: 4 }
            }}>
              <Avatar
                sx={{
                  width: { xs: 60, sm: 80, md: 100 },
                  height: { xs: 60, sm: 80, md: 100 },
                  bgcolor: 'rgba(255,255,255,0.2)',
                  margin: '0 auto 2rem',
                }}
              >
                <School sx={{ fontSize: { xs: 30, sm: 40, md: 50 } }} />
              </Avatar>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                Tertiary SMS
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  opacity: 0.9,
                  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
                }}
              >
                School Management System
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 2, 
                  opacity: 0.8,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  maxWidth: '500px',
                  mx: 'auto'
                }}
              >
                Comprehensive digital solution for managing all aspects of tertiary education
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              width: '100%',
              px: { xs: 1, sm: 2 }
            }}>
              <Card sx={{ 
                maxWidth: { xs: '100%', sm: 450, md: 500 },
                width: '100%',
                mx: 'auto',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}>
                <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <LoginIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h5" component="h2">
                      Sign In
                    </Typography>
                  </Box>
                  
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      margin="normal"
                      required
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      margin="normal"
                      required
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    
                    <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                      <InputLabel>Role</InputLabel>
                      <Select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        label="Role"
                      >
                        {roles.map((role) => (
                          <MenuItem key={role.value} value={role.value}>
                            {role.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{ 
                        mt: 3, 
                        mb: 2,
                        py: 1.5,
                        fontSize: '1.1rem'
                      }}
                    >
                      Sign In
                    </Button>
                  </form>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      textAlign: 'center', 
                      mt: 2,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
                    Demo credentials: admin@school.edu / password123
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Grade as GradeIcon,
  Payment as PaymentIcon,
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const Students = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Mock data
  const students = [
    {
      id: 'STU001',
      matricNumber: '2024/CS/001',
      name: 'John Smith',
      email: 'john.smith@student.edu',
      phone: '+234 801 234 5678',
      program: 'Computer Science',
      year: 'Year 1',
      status: 'active',
      gpa: '3.8',
      cgpa: '3.8',
      balance: 2450.00,
      enrollmentDate: '2024-09-01',
      courses: ['CS101', 'CS102', 'MATH101', 'ENG101'],
      hostel: 'Block A - Room 101',
    },
    {
      id: 'STU002',
      matricNumber: '2024/BA/002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@student.edu',
      phone: '+234 802 345 6789',
      program: 'Business Administration',
      year: 'Year 2',
      status: 'active',
      gpa: '3.9',
      cgpa: '3.85',
      balance: 0.00,
      enrollmentDate: '2023-09-01',
      courses: ['BA201', 'BA202', 'ECON101', 'STAT101'],
      hostel: 'Block B - Room 205',
    },
    {
      id: 'STU003',
      matricNumber: '2024/ENG/003',
      name: 'Michael Brown',
      email: 'michael.brown@student.edu',
      phone: '+234 803 456 7890',
      program: 'Engineering',
      year: 'Year 3',
      status: 'probation',
      gpa: '2.3',
      cgpa: '2.8',
      balance: 5200.00,
      enrollmentDate: '2022-09-01',
      courses: ['ENG301', 'ENG302', 'PHYS301', 'CHEM301'],
      hostel: 'Block C - Room 312',
    },
    {
      id: 'STU004',
      matricNumber: '2024/MED/004',
      name: 'Emily Davis',
      email: 'emily.davis@student.edu',
      phone: '+234 804 567 8901',
      program: 'Medicine',
      year: 'Year 1',
      status: 'active',
      gpa: '3.95',
      cgpa: '3.95',
      balance: 1200.00,
      enrollmentDate: '2024-09-01',
      courses: ['MED101', 'MED102', 'BIO101', 'CHEM101'],
      hostel: 'Block D - Room 108',
    },
  ];

  const programs = ['Computer Science', 'Business Administration', 'Engineering', 'Medicine'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'probation':
        return 'warning';
      case 'suspended':
        return 'error';
      case 'graduated':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'probation':
        return 'Academic Probation';
      case 'suspended':
        return 'Suspended';
      case 'graduated':
        return 'Graduated';
      default:
        return 'Unknown';
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = filterProgram === 'all' || student.program === filterProgram;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedStudent(null);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Student Management
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                }
              }}>
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  p: { xs: 3, sm: 4 }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%',
                    minHeight: { xs: '100px', sm: '120px' }
                  }}>
                    <Avatar sx={{ 
                      bgcolor: 'primary.main', 
                      mr: 3,
                      width: { xs: 64, sm: 72, md: 80 },
                      height: { xs: 64, sm: 72, md: 80 }
                    }}>
                      <PersonIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        color="textSecondary" 
                        gutterBottom
                        sx={{ 
                          fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                          fontWeight: 500,
                          mb: 1
                        }}
                      >
                        Total Students
                      </Typography>
                      <Typography 
                        variant="h3"
                        sx={{ 
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                          fontWeight: 'bold',
                          lineHeight: 1.1,
                          color: 'primary.main'
                        }}
                      >
                        {students.length}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                }
              }}>
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  p: { xs: 3, sm: 4 }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%',
                    minHeight: { xs: '100px', sm: '120px' }
                  }}>
                    <Avatar sx={{ 
                      bgcolor: 'success.main', 
                      mr: 3,
                      width: { xs: 64, sm: 72, md: 80 },
                      height: { xs: 64, sm: 72, md: 80 }
                    }}>
                      <CheckCircleIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        color="textSecondary" 
                        gutterBottom
                        sx={{ 
                          fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                          fontWeight: 500,
                          mb: 1
                        }}
                      >
                        Active Students
                      </Typography>
                      <Typography 
                        variant="h3"
                        sx={{ 
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                          fontWeight: 'bold',
                          lineHeight: 1.1,
                          color: 'success.main'
                        }}
                      >
                        {students.filter(student => student.status === 'active').length}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                }
              }}>
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  p: { xs: 3, sm: 4 }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%',
                    minHeight: { xs: '100px', sm: '120px' }
                  }}>
                    <Avatar sx={{ 
                      bgcolor: 'warning.main', 
                      mr: 3,
                      width: { xs: 64, sm: 72, md: 80 },
                      height: { xs: 64, sm: 72, md: 80 }
                    }}>
                      <WarningIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        color="textSecondary" 
                        gutterBottom
                        sx={{ 
                          fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                          fontWeight: 500,
                          mb: 1
                        }}
                      >
                        On Probation
                      </Typography>
                      <Typography 
                        variant="h3"
                        sx={{ 
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                          fontWeight: 'bold',
                          lineHeight: 1.1,
                          color: 'warning.main'
                        }}
                      >
                        {students.filter(student => student.status === 'probation').length}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                }
              }}>
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  p: { xs: 3, sm: 4 }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%',
                    minHeight: { xs: '100px', sm: '120px' }
                  }}>
                    <Avatar sx={{ 
                      bgcolor: 'info.main', 
                      mr: 3,
                      width: { xs: 64, sm: 72, md: 80 },
                      height: { xs: 64, sm: 72, md: 80 }
                    }}>
                      <SchoolIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        color="textSecondary" 
                        gutterBottom
                        sx={{ 
                          fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                          fontWeight: 500,
                          mb: 1
                        }}
                      >
                        Programs
                      </Typography>
                      <Typography 
                        variant="h3"
                        sx={{ 
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                          fontWeight: 'bold',
                          lineHeight: 1.1,
                          color: 'info.main'
                        }}
                      >
                        {programs.length}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Search and Filter */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Program</InputLabel>
                    <Select
                      value={filterProgram}
                      label="Program"
                      onChange={(e) => setFilterProgram(e.target.value)}
                    >
                      <MenuItem value="all">All Programs</MenuItem>
                      {programs.map((program) => (
                        <MenuItem key={program} value={program}>
                          {program}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filterStatus}
                      label="Status"
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="probation">Probation</MenuItem>
                      <MenuItem value="suspended">Suspended</MenuItem>
                      <MenuItem value="graduated">Graduated</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    fullWidth
                    sx={{ height: '56px' }}
                  >
                    Add Student
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Students Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Matric Number</TableCell>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Program</TableCell>
                      <TableCell>Year</TableCell>
                      <TableCell>GPA/CGPA</TableCell>
                      <TableCell>Balance</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.matricNumber}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2">
                              {student.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {student.email}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{student.program}</TableCell>
                        <TableCell>{student.year}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">
                              GPA: {student.gpa}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              CGPA: {student.cgpa}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2" 
                            color={student.balance > 0 ? 'error' : 'success'}
                          >
                            ${student.balance.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(student.status)}
                            color={getStatusColor(student.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleViewStudent(student)}
                            color="primary"
                          >
                            <ViewIcon />
                          </IconButton>
                          <IconButton color="secondary">
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Student Detail Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Student Profile - {selectedStudent?.matricNumber}
        </DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Box>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Personal Info" />
                <Tab label="Academic Info" />
                <Tab label="Financial Info" />
                <Tab label="Course Registration" />
              </Tabs>

              <TabPanel value={activeTab} index={0}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={selectedStudent.name}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Matric Number"
                      value={selectedStudent.matricNumber}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={selectedStudent.email}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={selectedStudent.phone}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Program"
                      value={selectedStudent.program}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Year"
                      value={selectedStudent.year}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Enrollment Date"
                      value={selectedStudent.enrollmentDate}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Hostel Assignment"
                      value={selectedStudent.hostel}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Current GPA"
                      value={selectedStudent.gpa}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Cumulative GPA"
                      value={selectedStudent.cgpa}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Academic Status"
                      value={getStatusLabel(selectedStudent.status)}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Program"
                      value={selectedStudent.program}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Outstanding Balance"
                      value={`$${selectedStudent.balance.toLocaleString()}`}
                      InputProps={{ readOnly: true }}
                      color={selectedStudent.balance > 0 ? 'error' : 'success'}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant="contained"
                      startIcon={<PaymentIcon />}
                      fullWidth
                      sx={{ height: '56px' }}
                    >
                      Process Payment
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={3}>
                <Typography variant="h6" gutterBottom>
                  Enrolled Courses
                </Typography>
                <List>
                  {selectedStudent.courses.map((course, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <AssignmentIcon />
                      </ListItemIcon>
                      <ListItemText primary={course} />
                      <Button variant="outlined" size="small">
                        View Details
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained" color="secondary">
            Edit Profile
          </Button>
          <Button variant="contained" color="primary">
            Generate Transcript
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Students;

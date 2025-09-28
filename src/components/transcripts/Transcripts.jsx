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
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Description as DescriptionIcon,
  School as SchoolIcon,
  Grade as GradeIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const Transcripts = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProgram, setFilterProgram] = useState('all');
  const [selectedTranscript, setSelectedTranscript] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Mock data
  const transcriptRequests = [
    {
      id: 'TR001',
      studentId: 'STU001',
      studentName: 'John Smith',
      matricNumber: '2024/CS/001',
      program: 'Computer Science',
      year: 'Year 2',
      status: 'completed',
      requestDate: '2024-01-10',
      completionDate: '2024-01-12',
      cgpa: 3.85,
      totalCredits: 45,
      completedCredits: 45,
      grades: [
        { course: 'CS101', title: 'Introduction to Computer Science', credits: 3, grade: 'A', points: 12 },
        { course: 'CS102', title: 'Data Structures', credits: 3, grade: 'A-', points: 11.1 },
        { course: 'MATH101', title: 'Calculus I', credits: 4, grade: 'B+', points: 13.2 },
        { course: 'ENG101', title: 'English Composition', credits: 3, grade: 'A', points: 12 },
        { course: 'PHYS101', title: 'Physics I', credits: 4, grade: 'A-', points: 14.8 },
      ],
      digitalSignature: 'verified',
      verificationCode: 'TR2024-001-VER',
    },
    {
      id: 'TR002',
      studentId: 'STU002',
      studentName: 'Sarah Johnson',
      matricNumber: '2024/BA/002',
      program: 'Business Administration',
      year: 'Year 3',
      status: 'pending',
      requestDate: '2024-01-15',
      completionDate: null,
      cgpa: 3.92,
      totalCredits: 60,
      completedCredits: 60,
      grades: [
        { course: 'BA101', title: 'Business Fundamentals', credits: 3, grade: 'A', points: 12 },
        { course: 'BA201', title: 'Management Principles', credits: 3, grade: 'A', points: 12 },
        { course: 'ECON101', title: 'Microeconomics', credits: 3, grade: 'A-', points: 11.1 },
        { course: 'STAT101', title: 'Statistics', credits: 3, grade: 'B+', points: 9.9 },
        { course: 'ACCT101', title: 'Accounting I', credits: 3, grade: 'A', points: 12 },
      ],
      digitalSignature: 'pending',
      verificationCode: null,
    },
    {
      id: 'TR003',
      studentId: 'STU003',
      studentName: 'Michael Brown',
      matricNumber: '2024/ENG/003',
      program: 'Engineering',
      year: 'Year 4',
      status: 'processing',
      requestDate: '2024-01-14',
      completionDate: null,
      cgpa: 3.45,
      totalCredits: 75,
      completedCredits: 75,
      grades: [
        { course: 'ENG101', title: 'Engineering Fundamentals', credits: 3, grade: 'B', points: 9 },
        { course: 'ENG201', title: 'Thermodynamics', credits: 4, grade: 'B+', points: 13.2 },
        { course: 'MATH201', title: 'Calculus II', credits: 4, grade: 'B-', points: 10.8 },
        { course: 'PHYS201', title: 'Physics II', credits: 4, grade: 'B', points: 12 },
        { course: 'CHEM101', title: 'Chemistry I', credits: 3, grade: 'A-', points: 11.1 },
      ],
      digitalSignature: 'pending',
      verificationCode: null,
    },
  ];

  const programs = ['Computer Science', 'Business Administration', 'Engineering', 'Medicine'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'pending':
        return 'info';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'processing':
        return 'Processing';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'processing':
        return <PendingIcon color="warning" />;
      case 'pending':
        return <PendingIcon color="info" />;
      case 'rejected':
        return <WarningIcon color="error" />;
      default:
        return <PendingIcon />;
    }
  };

  const filteredTranscripts = transcriptRequests.filter(transcript => {
    const matchesSearch = transcript.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transcript.matricNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || transcript.status === filterStatus;
    const matchesProgram = filterProgram === 'all' || transcript.program === filterProgram;
    return matchesSearch && matchesStatus && matchesProgram;
  });

  const handleViewTranscript = (transcript) => {
    setSelectedTranscript(transcript);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedTranscript(null);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  // Calculate statistics
  const totalRequests = transcriptRequests.length;
  const completedRequests = transcriptRequests.filter(t => t.status === 'completed').length;
  const pendingRequests = transcriptRequests.filter(t => t.status === 'pending').length;
  const processingRequests = transcriptRequests.filter(t => t.status === 'processing').length;

  const steps = ['Request Submitted', 'Academic Review', 'Verification', 'Digital Signature', 'Completed'];

  const getCurrentStep = (status) => {
    switch (status) {
      case 'pending':
        return 1;
      case 'processing':
        return 2;
      case 'completed':
        return 5;
      default:
        return 1;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Transcript Management
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
                      <DescriptionIcon />
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
                        Total Requests
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
                        {totalRequests}
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
                        Completed
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
                        {completedRequests}
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
                      <PendingIcon />
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
                        Processing
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
                        {processingRequests}
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
                      <AssignmentIcon />
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
                        Pending Review
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
                        {pendingRequests}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Processing Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Processing Pipeline
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Pending Review</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {pendingRequests}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(pendingRequests / totalRequests) * 100} 
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Processing</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {processingRequests}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(processingRequests / totalRequests) * 100} 
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Completed</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {completedRequests}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(completedRequests / totalRequests) * 100} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<DescriptionIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Generate New Transcript
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Bulk Download
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Print Transcripts
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<FilterIcon />}
                    fullWidth
                  >
                    Generate Report
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Search and Filter */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Search transcripts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
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
                      <MenuItem value="pending">Pending Review</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                  </FormControl>
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
                <Grid item xs={12} md={2}>
                  <Button
                    variant="contained"
                    startIcon={<FilterIcon />}
                    fullWidth
                    sx={{ height: '56px' }}
                  >
                    Filter
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Transcripts Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Request ID</TableCell>
                      <TableCell>Student</TableCell>
                      <TableCell>Program</TableCell>
                      <TableCell>CGPA</TableCell>
                      <TableCell>Credits</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Request Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTranscripts.map((transcript) => (
                      <TableRow key={transcript.id}>
                        <TableCell>{transcript.id}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2">
                              {transcript.studentName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {transcript.matricNumber}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{transcript.program}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {transcript.cgpa.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {transcript.completedCredits}/{transcript.totalCredits}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getStatusIcon(transcript.status)}
                            <Chip
                              label={getStatusLabel(transcript.status)}
                              color={getStatusColor(transcript.status)}
                              size="small"
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>{transcript.requestDate}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleViewTranscript(transcript)}
                            color="primary"
                          >
                            <ViewIcon />
                          </IconButton>
                          {transcript.status === 'completed' && (
                            <IconButton color="success">
                              <DownloadIcon />
                            </IconButton>
                          )}
                          <IconButton color="secondary">
                            <PrintIcon />
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

      {/* Transcript Detail Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Transcript Details - {selectedTranscript?.id}
        </DialogTitle>
        <DialogContent>
          {selectedTranscript && (
            <Box>
              {/* Progress Stepper */}
              <Stepper activeStep={getCurrentStep(selectedTranscript.status) - 1} sx={{ mb: 3 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Divider sx={{ mb: 3 }} />

              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Student Info" />
                <Tab label="Academic Record" />
                <Tab label="Verification" />
                <Tab label="Download Options" />
              </Tabs>

              <TabPanel value={activeTab} index={0}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Student Name"
                      value={selectedTranscript.studentName}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Matric Number"
                      value={selectedTranscript.matricNumber}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Program"
                      value={selectedTranscript.program}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Year"
                      value={selectedTranscript.year}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Cumulative GPA"
                      value={selectedTranscript.cgpa.toFixed(2)}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Total Credits"
                      value={`${selectedTranscript.completedCredits}/${selectedTranscript.totalCredits}`}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Request Date"
                      value={selectedTranscript.requestDate}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Completion Date"
                      value={selectedTranscript.completionDate || 'Pending'}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <Typography variant="h6" gutterBottom>
                  Academic Record
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Course Code</TableCell>
                        <TableCell>Course Title</TableCell>
                        <TableCell>Credits</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Points</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedTranscript.grades.map((grade, index) => (
                        <TableRow key={index}>
                          <TableCell>{grade.course}</TableCell>
                          <TableCell>{grade.title}</TableCell>
                          <TableCell>{grade.credits}</TableCell>
                          <TableCell>
                            <Chip 
                              label={grade.grade} 
                              color={grade.grade === 'A' ? 'success' : grade.grade === 'B' ? 'primary' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{grade.points}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Digital Signature"
                      value={selectedTranscript.digitalSignature}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Verification Code"
                      value={selectedTranscript.verificationCode || 'Pending'}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Verification URL: https://transcripts.school.edu/verify/{selectedTranscript.id}
                    </Typography>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={3}>
                <Typography variant="h6" gutterBottom>
                  Download Options
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      Download PDF
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant="outlined"
                      startIcon={<PrintIcon />}
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      Print Transcript
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant="outlined"
                      startIcon={<DescriptionIcon />}
                      fullWidth
                    >
                      Send by Email
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant="outlined"
                      startIcon={<AssignmentIcon />}
                      fullWidth
                    >
                      Generate Verification Link
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {selectedTranscript?.status === 'pending' && (
            <Button variant="contained" color="warning">
              Start Processing
            </Button>
          )}
          {selectedTranscript?.status === 'completed' && (
            <Button variant="contained" color="success">
              Download PDF
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Transcripts;

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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Book as BookIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Grade as GradeIcon,
  Schedule as ScheduleIcon,
  ExpandMore as ExpandMoreIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const Courses = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Mock data
  const courses = [
    {
      id: 'CS101',
      code: 'CS101',
      title: 'Introduction to Computer Science',
      description: 'Fundamental concepts of computer science including programming basics, algorithms, and data structures.',
      department: 'Computer Science',
      semester: 'Fall 2024',
      credits: 3,
      lecturer: 'Dr. Jane Smith',
      lecturerEmail: 'jane.smith@school.edu',
      enrolledStudents: 45,
      maxStudents: 50,
      status: 'active',
      schedule: 'Mon, Wed, Fri 10:00 AM - 11:00 AM',
      room: 'CS Building Room 101',
      prerequisites: ['MATH101'],
      assignments: [
        { id: 1, title: 'Programming Assignment 1', dueDate: '2024-02-15', submissions: 42 },
        { id: 2, title: 'Midterm Exam', dueDate: '2024-03-01', submissions: 45 },
        { id: 3, title: 'Final Project', dueDate: '2024-04-30', submissions: 0 },
      ],
      averageGrade: 85.5,
    },
    {
      id: 'MATH101',
      code: 'MATH101',
      title: 'Calculus I',
      description: 'Introduction to differential and integral calculus with applications.',
      department: 'Mathematics',
      semester: 'Fall 2024',
      credits: 4,
      lecturer: 'Prof. John Doe',
      lecturerEmail: 'john.doe@school.edu',
      enrolledStudents: 38,
      maxStudents: 40,
      status: 'active',
      schedule: 'Tue, Thu 2:00 PM - 4:00 PM',
      room: 'Math Building Room 205',
      prerequisites: [],
      assignments: [
        { id: 1, title: 'Problem Set 1', dueDate: '2024-02-10', submissions: 38 },
        { id: 2, title: 'Quiz 1', dueDate: '2024-02-20', submissions: 38 },
      ],
      averageGrade: 78.2,
    },
    {
      id: 'ENG101',
      code: 'ENG101',
      title: 'Engineering Fundamentals',
      description: 'Basic principles of engineering design and problem-solving methodologies.',
      department: 'Engineering',
      semester: 'Fall 2024',
      credits: 3,
      lecturer: 'Dr. Michael Johnson',
      lecturerEmail: 'michael.johnson@school.edu',
      enrolledStudents: 52,
      maxStudents: 60,
      status: 'active',
      schedule: 'Mon, Wed 1:00 PM - 2:30 PM',
      room: 'Engineering Building Room 301',
      prerequisites: ['PHYS101'],
      assignments: [
        { id: 1, title: 'Design Project', dueDate: '2024-02-28', submissions: 50 },
        { id: 2, title: 'Lab Report 1', dueDate: '2024-03-05', submissions: 52 },
      ],
      averageGrade: 82.1,
    },
    {
      id: 'BA201',
      code: 'BA201',
      title: 'Business Management',
      description: 'Principles of business management, organizational behavior, and strategic planning.',
      department: 'Business Administration',
      semester: 'Spring 2024',
      credits: 3,
      lecturer: 'Prof. Sarah Wilson',
      lecturerEmail: 'sarah.wilson@school.edu',
      enrolledStudents: 28,
      maxStudents: 30,
      status: 'completed',
      schedule: 'Tue, Thu 10:00 AM - 11:30 AM',
      room: 'Business Building Room 102',
      prerequisites: ['BA101'],
      assignments: [
        { id: 1, title: 'Case Study Analysis', dueDate: '2024-01-15', submissions: 28 },
        { id: 2, title: 'Group Presentation', dueDate: '2024-01-25', submissions: 28 },
        { id: 3, title: 'Final Exam', dueDate: '2024-02-05', submissions: 28 },
      ],
      averageGrade: 88.7,
    },
  ];

  const departments = ['Computer Science', 'Mathematics', 'Engineering', 'Business Administration', 'Medicine'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      case 'upcoming':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'upcoming':
        return 'Upcoming';
      default:
        return 'Unknown';
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.lecturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || course.department === filterDepartment;
    const matchesSemester = filterSemester === 'all' || course.semester === filterSemester;
    return matchesSearch && matchesDepartment && matchesSemester;
  });

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedCourse(null);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  // Calculate statistics
  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.status === 'active').length;
  const totalStudents = courses.reduce((sum, c) => sum + c.enrolledStudents, 0);
  const averageEnrollment = Math.round(totalStudents / totalCourses);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Course Management
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
                      <BookIcon />
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
                        Total Courses
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
                        {totalCourses}
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
                        Active Courses
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
                        {activeCourses}
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
                      <GroupIcon />
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
                          color: 'info.main'
                        }}
                      >
                        {totalStudents}
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
                      <TrendingUpIcon />
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
                        Avg. Enrollment
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
                        {averageEnrollment}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Course Performance Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Performance
              </Typography>
              <Box sx={{ mt: 2 }}>
                {courses.slice(0, 3).map((course) => (
                  <Box key={course.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{course.code}</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {course.averageGrade}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={course.averageGrade} 
                      sx={{ mb: 1 }}
                    />
                  </Box>
                ))}
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
                    startIcon={<AddIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Create New Course
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<ScheduleIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Schedule Exams
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<GradeIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Grade Assignments
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<AssignmentIcon />}
                    fullWidth
                  >
                    View Reports
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
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={filterDepartment}
                      label="Department"
                      onChange={(e) => setFilterDepartment(e.target.value)}
                    >
                      <MenuItem value="all">All Departments</MenuItem>
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Semester</InputLabel>
                    <Select
                      value={filterSemester}
                      label="Semester"
                      onChange={(e) => setFilterSemester(e.target.value)}
                    >
                      <MenuItem value="all">All Semesters</MenuItem>
                      <MenuItem value="Fall 2024">Fall 2024</MenuItem>
                      <MenuItem value="Spring 2024">Spring 2024</MenuItem>
                      <MenuItem value="Summer 2024">Summer 2024</MenuItem>
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

        {/* Courses Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course Code</TableCell>
                      <TableCell>Course Title</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Lecturer</TableCell>
                      <TableCell>Enrollment</TableCell>
                      <TableCell>Credits</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>{course.code}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2">
                              {course.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {course.semester}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{course.department}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">
                              {course.lecturer}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {course.lecturerEmail}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">
                              {course.enrolledStudents}/{course.maxStudents}
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={(course.enrolledStudents / course.maxStudents) * 100}
                              size="small"
                              sx={{ mt: 0.5 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(course.status)}
                            color={getStatusColor(course.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleViewCourse(course)}
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

      {/* Course Detail Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Course Details - {selectedCourse?.code}
        </DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <Box>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Course Info" />
                <Tab label="Assignments" />
                <Tab label="Students" />
                <Tab label="Schedule" />
              </Tabs>

              <TabPanel value={activeTab} index={0}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Course Code"
                      value={selectedCourse.code}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Course Title"
                      value={selectedCourse.title}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Department"
                      value={selectedCourse.department}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Credits"
                      value={selectedCourse.credits}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Lecturer"
                      value={selectedCourse.lecturer}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Semester"
                      value={selectedCourse.semester}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Enrollment"
                      value={`${selectedCourse.enrolledStudents}/${selectedCourse.maxStudents}`}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Average Grade"
                      value={`${selectedCourse.averageGrade}%`}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      value={selectedCourse.description}
                      multiline
                      rows={3}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Prerequisites"
                      value={selectedCourse.prerequisites.join(', ') || 'None'}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <Typography variant="h6" gutterBottom>
                  Course Assignments
                </Typography>
                {selectedCourse.assignments.map((assignment) => (
                  <Accordion key={assignment.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <AssignmentIcon sx={{ mr: 2 }} />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle1">
                            {assignment.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Due: {assignment.dueDate}
                          </Typography>
                        </Box>
                        <Chip 
                          label={`${assignment.submissions}/${selectedCourse.enrolledStudents} submitted`}
                          size="small"
                          color={assignment.submissions === selectedCourse.enrolledStudents ? 'success' : 'warning'}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Button variant="outlined" size="small">
                            View Submissions
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Button variant="outlined" size="small">
                            Grade Assignment
                          </Button>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <Typography variant="h6" gutterBottom>
                  Enrolled Students ({selectedCourse.enrolledStudents})
                </Typography>
                <List>
                  {Array.from({ length: Math.min(selectedCourse.enrolledStudents, 10) }, (_, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Student ${i + 1}`}
                        secondary={`STU${String(i + 1).padStart(3, '0')}`}
                      />
                      <Button variant="outlined" size="small">
                        View Grades
                      </Button>
                    </ListItem>
                  ))}
                  {selectedCourse.enrolledStudents > 10 && (
                    <ListItem>
                      <ListItemText
                        primary={`... and ${selectedCourse.enrolledStudents - 10} more students`}
                      />
                    </ListItem>
                  )}
                </List>
              </TabPanel>

              <TabPanel value={activeTab} index={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Schedule"
                      value={selectedCourse.schedule}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Room"
                      value={selectedCourse.room}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained" color="secondary">
            Edit Course
          </Button>
          <Button variant="contained" color="primary">
            Generate Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Courses;

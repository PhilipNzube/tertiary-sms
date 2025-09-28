import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Book as BookIcon,
  Payment as PaymentIcon,
  Home as HomeIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const Dashboard = ({ userRole }) => {
  const getDashboardData = () => {
    const baseData = {
      totalStudents: 12450,
      totalCourses: 156,
      totalStaff: 234,
      totalRevenue: 1250000,
    };

    const roleBasedData = {
      admin: {
        title: 'Administrative Overview',
        stats: [
          { label: 'Total Students', value: baseData.totalStudents, icon: <PeopleIcon />, color: 'primary' },
          { label: 'Active Courses', value: baseData.totalCourses, icon: <BookIcon />, color: 'secondary' },
          { label: 'Total Staff', value: baseData.totalStaff, icon: <SchoolIcon />, color: 'success' },
          { label: 'Monthly Revenue', value: `$${baseData.totalRevenue.toLocaleString()}`, icon: <PaymentIcon />, color: 'info' },
        ],
        recentActivities: [
          { action: 'New student registration', time: '2 hours ago', type: 'success' },
          { action: 'Payment received from John Doe', time: '3 hours ago', type: 'success' },
          { action: 'Course enrollment deadline approaching', time: '5 hours ago', type: 'warning' },
          { action: 'Hostel allocation completed', time: '1 day ago', type: 'info' },
        ],
        quickActions: [
          { label: 'Review Applications', icon: <AssignmentIcon />, color: 'primary' },
          { label: 'Generate Reports', icon: <TrendingUpIcon />, color: 'secondary' },
          { label: 'Manage Courses', icon: <BookIcon />, color: 'success' },
          { label: 'View Analytics', icon: <TrendingUpIcon />, color: 'info' },
        ],
      },
      student: {
        title: 'Student Dashboard',
        stats: [
          { label: 'Enrolled Courses', value: 6, icon: <BookIcon />, color: 'primary' },
          { label: 'Pending Assignments', value: 3, icon: <AssignmentIcon />, color: 'warning' },
          { label: 'CGPA', value: '3.85', icon: <TrendingUpIcon />, color: 'success' },
          { label: 'Outstanding Balance', value: '$2,450', icon: <PaymentIcon />, color: 'error' },
        ],
        recentActivities: [
          { action: 'Assignment submitted - Mathematics', time: '1 hour ago', type: 'success' },
          { action: 'Grade posted - Physics Lab', time: '2 hours ago', type: 'info' },
          { action: 'Payment due in 3 days', time: '1 day ago', type: 'warning' },
          { action: 'Course registration opens tomorrow', time: '1 day ago', type: 'info' },
        ],
        quickActions: [
          { label: 'View Grades', icon: <AssignmentIcon />, color: 'primary' },
          { label: 'Make Payment', icon: <PaymentIcon />, color: 'secondary' },
          { label: 'Download Transcript', icon: <AssignmentIcon />, color: 'success' },
          { label: 'Course Registration', icon: <BookIcon />, color: 'info' },
        ],
      },
      lecturer: {
        title: 'Faculty Dashboard',
        stats: [
          { label: 'Assigned Courses', value: 4, icon: <BookIcon />, color: 'primary' },
          { label: 'Total Students', value: 120, icon: <PeopleIcon />, color: 'secondary' },
          { label: 'Pending Grading', value: 15, icon: <AssignmentIcon />, color: 'warning' },
          { label: 'Office Hours', value: 'Mon-Fri 2-4PM', icon: <SchoolIcon />, color: 'info' },
        ],
        recentActivities: [
          { action: 'Assignment submitted by 15 students', time: '30 minutes ago', type: 'info' },
          { action: 'Grade posted for Mathematics Quiz', time: '1 hour ago', type: 'success' },
          { action: 'New course assigned - Calculus', time: '2 hours ago', type: 'info' },
          { action: 'Student consultation scheduled', time: '3 hours ago', type: 'info' },
        ],
        quickActions: [
          { label: 'Grade Assignments', icon: <AssignmentIcon />, color: 'primary' },
          { label: 'View Students', icon: <PeopleIcon />, color: 'secondary' },
          { label: 'Upload Materials', icon: <BookIcon />, color: 'success' },
          { label: 'Schedule Exam', icon: <AssignmentIcon />, color: 'info' },
        ],
      },
    };

    return roleBasedData[userRole] || roleBasedData.admin;
  };

  const dashboardData = getDashboardData();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <WarningIcon color="error" />;
      default:
        return <PendingIcon color="info" />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {dashboardData.title}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {dashboardData.stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
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
                        bgcolor: `${stat.color}.main`, 
                        mr: 3,
                        width: { xs: 64, sm: 72, md: 80 },
                        height: { xs: 64, sm: 72, md: 80 }
                      }}>
                        {stat.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography 
                          color="textSecondary" 
                          gutterBottom 
                          variant="h6"
                          sx={{ 
                            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                            fontWeight: 500,
                            mb: 1
                          }}
                        >
                          {stat.label}
                        </Typography>
                        <Typography 
                          variant="h3"
                          sx={{ 
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            fontWeight: 'bold',
                            lineHeight: 1.1,
                            color: `${stat.color}.main`
                          }}
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ 
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <List>
                  {dashboardData.recentActivities.map((activity, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          {getActivityIcon(activity.type)}
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.action}
                          secondary={activity.time}
                        />
                      </ListItem>
                      {index < dashboardData.recentActivities.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ 
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {dashboardData.quickActions.map((action, index) => (
                    <Grid item xs={12} key={index}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={action.icon}
                        color={action.color}
                        sx={{ 
                          justifyContent: 'flex-start',
                          py: 1.5,
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'translateX(4px)',
                          }
                        }}
                      >
                        {action.label}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Progress Overview */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Academic Progress Overview
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Course Completion Rate
                  </Typography>
                  <LinearProgress variant="determinate" value={75} sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    75% Complete
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Assignment Submission Rate
                  </Typography>
                  <LinearProgress variant="determinate" value={90} sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    90% Complete
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
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
  Badge,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Send as SendIcon,
  Add as AddIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Sms as SmsIcon,
  Announcement as AnnouncementIcon,
  Assignment as AssignmentIcon,
  Payment as PaymentIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  MarkEmailRead as MarkReadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Notifications = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Mock data
  const notifications = [
    {
      id: 'NOT001',
      title: 'Payment Due Reminder',
      message: 'Your tuition fee payment of $2,450 is due on January 20, 2024. Please make payment to avoid late fees.',
      type: 'payment',
      priority: 'high',
      status: 'unread',
      recipient: 'John Smith',
      recipientEmail: 'john.smith@student.edu',
      sender: 'Finance Department',
      sendDate: '2024-01-15',
      readDate: null,
      channels: ['email', 'sms', 'in_app'],
      attachments: [],
      category: 'financial',
    },
    {
      id: 'NOT002',
      title: 'Course Registration Opens',
      message: 'Course registration for Spring 2024 semester will open on February 1, 2024. Please prepare your course selections.',
      type: 'academic',
      priority: 'medium',
      status: 'read',
      recipient: 'All Students',
      recipientEmail: 'all@student.edu',
      sender: 'Registrar Office',
      sendDate: '2024-01-14',
      readDate: '2024-01-15',
      channels: ['email', 'in_app'],
      attachments: ['course_catalog.pdf'],
      category: 'academic',
    },
    {
      id: 'NOT003',
      title: 'Hostel Maintenance Notice',
      message: 'Scheduled maintenance will be conducted in Block A on January 25, 2024. Water supply will be interrupted from 9 AM to 3 PM.',
      type: 'maintenance',
      priority: 'medium',
      status: 'unread',
      recipient: 'Block A Residents',
      recipientEmail: 'block-a@student.edu',
      sender: 'Hostel Management',
      sendDate: '2024-01-13',
      readDate: null,
      channels: ['email', 'sms', 'in_app'],
      attachments: [],
      category: 'facility',
    },
    {
      id: 'NOT004',
      title: 'Grade Posted',
      message: 'Your grade for CS101 - Introduction to Computer Science has been posted. You can view it in your student portal.',
      type: 'grade',
      priority: 'low',
      status: 'read',
      recipient: 'Sarah Johnson',
      recipientEmail: 'sarah.johnson@student.edu',
      sender: 'Dr. Jane Smith',
      sendDate: '2024-01-12',
      readDate: '2024-01-12',
      channels: ['email', 'in_app'],
      attachments: [],
      category: 'academic',
    },
    {
      id: 'NOT005',
      title: 'Emergency Campus Alert',
      message: 'Due to severe weather conditions, all classes scheduled for today (January 16, 2024) have been cancelled. Please stay indoors.',
      type: 'emergency',
      priority: 'urgent',
      status: 'unread',
      recipient: 'All Campus',
      recipientEmail: 'all@campus.edu',
      sender: 'Campus Security',
      sendDate: '2024-01-16',
      readDate: null,
      channels: ['email', 'sms', 'in_app', 'push'],
      attachments: [],
      category: 'safety',
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'payment':
        return <PaymentIcon />;
      case 'academic':
        return <SchoolIcon />;
      case 'maintenance':
        return <AssignmentIcon />;
      case 'grade':
        return <CheckCircleIcon />;
      case 'emergency':
        return <WarningIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'Urgent';
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Unknown';
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'email':
        return <EmailIcon />;
      case 'sms':
        return <SmsIcon />;
      case 'in_app':
        return <NotificationsIcon />;
      case 'push':
        return <AnnouncementIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesStatus = filterStatus === 'all' || notification.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewNotification = (notification) => {
    setSelectedNotification(notification);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedNotification(null);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  // Calculate statistics
  const totalNotifications = notifications.length;
  const unreadNotifications = notifications.filter(n => n.status === 'unread').length;
  const urgentNotifications = notifications.filter(n => n.priority === 'urgent').length;
  const todayNotifications = notifications.filter(n => n.sendDate === '2024-01-16').length;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Notification Center
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
                      <NotificationsIcon />
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
                        Total Notifications
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
                        {totalNotifications}
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
                    <Badge badgeContent={unreadNotifications} color="error">
                      <Avatar sx={{ 
                        bgcolor: 'warning.main', 
                        mr: 3,
                        width: { xs: 64, sm: 72, md: 80 },
                        height: { xs: 64, sm: 72, md: 80 }
                      }}>
                        <InfoIcon />
                      </Avatar>
                    </Badge>
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
                        Unread
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
                        {unreadNotifications}
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
                      bgcolor: 'error.main', 
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
                        Urgent
                      </Typography>
                      <Typography 
                        variant="h3"
                        sx={{ 
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                          fontWeight: 'bold',
                          lineHeight: 1.1,
                          color: 'error.main'
                        }}
                      >
                        {urgentNotifications}
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
                      <AnnouncementIcon />
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
                        Today
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
                        {todayNotifications}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notification Preferences
              </Typography>
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="SMS Notifications"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="In-App Notifications"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Push Notifications"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Emergency Alerts"
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
                    startIcon={<AddIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Create Notification
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<SendIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Send Bulk Notification
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<MarkReadIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Mark All as Read
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<FilterIcon />}
                    fullWidth
                  >
                    Notification Templates
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
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={filterType}
                      label="Type"
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <MenuItem value="all">All Types</MenuItem>
                      <MenuItem value="payment">Payment</MenuItem>
                      <MenuItem value="academic">Academic</MenuItem>
                      <MenuItem value="maintenance">Maintenance</MenuItem>
                      <MenuItem value="grade">Grade</MenuItem>
                      <MenuItem value="emergency">Emergency</MenuItem>
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
                      <MenuItem value="unread">Unread</MenuItem>
                      <MenuItem value="read">Read</MenuItem>
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

        {/* Notifications List */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <List>
                {filteredNotifications.map((notification) => (
                  <React.Fragment key={notification.id}>
                    <ListItem
                      sx={{
                        bgcolor: notification.status === 'unread' ? 'action.hover' : 'transparent',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: getPriorityColor(notification.priority) + '.main' }}>
                          {getTypeIcon(notification.type)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1">
                              {notification.title}
                            </Typography>
                            <Chip
                              label={getPriorityLabel(notification.priority)}
                              color={getPriorityColor(notification.priority)}
                              size="small"
                            />
                            {notification.status === 'unread' && (
                              <Chip
                                label="New"
                                color="primary"
                                size="small"
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {notification.message}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography variant="caption" color="text.secondary">
                                To: {notification.recipient}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                From: {notification.sender}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {notification.sendDate}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 0.5 }}>
                                {notification.channels.map((channel) => (
                                  <Avatar
                                    key={channel}
                                    sx={{ width: 16, height: 16, bgcolor: 'grey.300' }}
                                  >
                                    {getChannelIcon(channel)}
                                  </Avatar>
                                ))}
                              </Box>
                            </Box>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          onClick={() => handleViewNotification(notification)}
                          color="primary"
                          size="small"
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton color="secondary" size="small">
                          <MarkReadIcon />
                        </IconButton>
                        <IconButton color="error" size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Notification Detail Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Notification Details - {selectedNotification?.id}
        </DialogTitle>
        <DialogContent>
          {selectedNotification && (
            <Box>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Content" />
                <Tab label="Delivery Info" />
                <Tab label="Recipients" />
                <Tab label="Attachments" />
              </Tabs>

              <TabPanel value={activeTab} index={0}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title"
                      value={selectedNotification.title}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      value={selectedNotification.message}
                      multiline
                      rows={4}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Type"
                      value={selectedNotification.type}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Priority"
                      value={getPriorityLabel(selectedNotification.priority)}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Category"
                      value={selectedNotification.category}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Status"
                      value={selectedNotification.status}
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
                      label="Sender"
                      value={selectedNotification.sender}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Send Date"
                      value={selectedNotification.sendDate}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Read Date"
                      value={selectedNotification.readDate || 'Not read'}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Delivery Channels"
                      value={selectedNotification.channels.join(', ')}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <Typography variant="h6" gutterBottom>
                  Recipient Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Recipient Name"
                      value={selectedNotification.recipient}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      value={selectedNotification.recipientEmail}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={3}>
                <Typography variant="h6" gutterBottom>
                  Attachments
                </Typography>
                {selectedNotification.attachments.length > 0 ? (
                  <List>
                    {selectedNotification.attachments.map((attachment, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={attachment} />
                        <Button variant="outlined" size="small">
                          Download
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No attachments
                  </Typography>
                )}
              </TabPanel>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained" color="secondary">
            Edit Notification
          </Button>
          <Button variant="contained" color="primary">
            Resend
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notifications;

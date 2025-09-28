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
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Bed as BedIcon,
  Group as GroupIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Cancel as CancelIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const Hostels = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBlock, setFilterBlock] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Mock data
  const rooms = [
    {
      id: 'A101',
      block: 'Block A',
      roomNumber: '101',
      capacity: 2,
      currentOccupancy: 2,
      gender: 'Male',
      type: 'Double',
      monthlyFee: 500.00,
      status: 'occupied',
      students: [
        { id: 'STU001', name: 'John Smith', matricNumber: '2024/CS/001', email: 'john.smith@student.edu' },
        { id: 'STU002', name: 'Mike Johnson', matricNumber: '2024/CS/002', email: 'mike.johnson@student.edu' },
      ],
      facilities: ['WiFi', 'Air Conditioning', 'Study Table', 'Wardrobe'],
      maintenanceIssues: [],
    },
    {
      id: 'A102',
      block: 'Block A',
      roomNumber: '102',
      capacity: 2,
      currentOccupancy: 1,
      gender: 'Male',
      type: 'Double',
      monthlyFee: 500.00,
      status: 'partially_occupied',
      students: [
        { id: 'STU003', name: 'David Brown', matricNumber: '2024/ENG/003', email: 'david.brown@student.edu' },
      ],
      facilities: ['WiFi', 'Air Conditioning', 'Study Table', 'Wardrobe'],
      maintenanceIssues: ['Air conditioning not working'],
    },
    {
      id: 'B201',
      block: 'Block B',
      roomNumber: '201',
      capacity: 1,
      currentOccupancy: 0,
      gender: 'Female',
      type: 'Single',
      monthlyFee: 800.00,
      status: 'available',
      students: [],
      facilities: ['WiFi', 'Air Conditioning', 'Study Table', 'Wardrobe', 'Private Bathroom'],
      maintenanceIssues: [],
    },
    {
      id: 'B202',
      block: 'Block B',
      roomNumber: '202',
      capacity: 2,
      currentOccupancy: 2,
      gender: 'Female',
      type: 'Double',
      monthlyFee: 600.00,
      status: 'occupied',
      students: [
        { id: 'STU004', name: 'Sarah Wilson', matricNumber: '2024/BA/004', email: 'sarah.wilson@student.edu' },
        { id: 'STU005', name: 'Emily Davis', matricNumber: '2024/MED/005', email: 'emily.davis@student.edu' },
      ],
      facilities: ['WiFi', 'Air Conditioning', 'Study Table', 'Wardrobe'],
      maintenanceIssues: ['WiFi connection issues'],
    },
    {
      id: 'C301',
      block: 'Block C',
      roomNumber: '301',
      capacity: 4,
      currentOccupancy: 0,
      gender: 'Male',
      type: 'Quad',
      monthlyFee: 400.00,
      status: 'maintenance',
      students: [],
      facilities: ['WiFi', 'Study Table', 'Wardrobe', 'Common Area'],
      maintenanceIssues: ['Plumbing issues', 'Electrical problems'],
    },
  ];

  const blocks = ['Block A', 'Block B', 'Block C', 'Block D'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied':
        return 'success';
      case 'partially_occupied':
        return 'warning';
      case 'available':
        return 'info';
      case 'maintenance':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'occupied':
        return 'Fully Occupied';
      case 'partially_occupied':
        return 'Partially Occupied';
      case 'available':
        return 'Available';
      case 'maintenance':
        return 'Under Maintenance';
      default:
        return 'Unknown';
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.block.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBlock = filterBlock === 'all' || room.block === filterBlock;
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    return matchesSearch && matchesBlock && matchesStatus;
  });

  const handleViewRoom = (room) => {
    setSelectedRoom(room);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedRoom(null);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  // Calculate statistics
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
  const currentOccupancy = rooms.reduce((sum, r) => sum + r.currentOccupancy, 0);
  const occupancyRate = Math.round((currentOccupancy / totalCapacity) * 100);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Hostel Management
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
                      <HomeIcon />
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
                        Total Rooms
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
                        {totalRooms}
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
                        Occupied Rooms
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
                        {occupiedRooms}
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
                      <BedIcon />
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
                        Available Rooms
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
                        {availableRooms}
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
                        Occupancy Rate
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
                        {occupancyRate}%
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Occupancy Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Block-wise Occupancy
              </Typography>
              <Box sx={{ mt: 2 }}>
                {blocks.map((block) => {
                  const blockRooms = rooms.filter(r => r.block === block);
                  const blockOccupancy = blockRooms.reduce((sum, r) => sum + r.currentOccupancy, 0);
                  const blockCapacity = blockRooms.reduce((sum, r) => sum + r.capacity, 0);
                  const blockRate = blockCapacity > 0 ? Math.round((blockOccupancy / blockCapacity) * 100) : 0;
                  
                  return (
                    <Box key={block} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{block}</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {blockOccupancy}/{blockCapacity} ({blockRate}%)
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={blockRate} 
                        sx={{ mb: 1 }}
                      />
                    </Box>
                  );
                })}
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
                    Add New Room
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<AssignmentIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Room Assignment
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<WarningIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Maintenance Requests
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
                    placeholder="Search rooms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Block</InputLabel>
                    <Select
                      value={filterBlock}
                      label="Block"
                      onChange={(e) => setFilterBlock(e.target.value)}
                    >
                      <MenuItem value="all">All Blocks</MenuItem>
                      {blocks.map((block) => (
                        <MenuItem key={block} value={block}>
                          {block}
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
                      <MenuItem value="occupied">Fully Occupied</MenuItem>
                      <MenuItem value="partially_occupied">Partially Occupied</MenuItem>
                      <MenuItem value="available">Available</MenuItem>
                      <MenuItem value="maintenance">Under Maintenance</MenuItem>
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

        {/* Rooms Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Room</TableCell>
                      <TableCell>Block</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Occupancy</TableCell>
                      <TableCell>Monthly Fee</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {room.roomNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>{room.block}</TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>{room.gender}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">
                              {room.currentOccupancy}/{room.capacity}
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={(room.currentOccupancy / room.capacity) * 100}
                              size="small"
                              sx={{ mt: 0.5 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>${room.monthlyFee}</TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(room.status)}
                            color={getStatusColor(room.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleViewRoom(room)}
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

      {/* Room Detail Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Room Details - {selectedRoom?.block} {selectedRoom?.roomNumber}
        </DialogTitle>
        <DialogContent>
          {selectedRoom && (
            <Box>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Room Info" />
                <Tab label="Occupants" />
                <Tab label="Facilities" />
                <Tab label="Maintenance" />
              </Tabs>

              <TabPanel value={activeTab} index={0}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Room Number"
                      value={selectedRoom.roomNumber}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Block"
                      value={selectedRoom.block}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Room Type"
                      value={selectedRoom.type}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Gender"
                      value={selectedRoom.gender}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Capacity"
                      value={selectedRoom.capacity}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Current Occupancy"
                      value={selectedRoom.currentOccupancy}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Monthly Fee"
                      value={`$${selectedRoom.monthlyFee}`}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Status"
                      value={getStatusLabel(selectedRoom.status)}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <Typography variant="h6" gutterBottom>
                  Current Occupants ({selectedRoom.currentOccupancy})
                </Typography>
                {selectedRoom.students.length > 0 ? (
                  <List>
                    {selectedRoom.students.map((student) => (
                      <ListItem key={student.id}>
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={student.name}
                          secondary={`${student.matricNumber} - ${student.email}`}
                        />
                        <Button variant="outlined" size="small">
                          View Profile
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No occupants assigned to this room.
                  </Typography>
                )}
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <Typography variant="h6" gutterBottom>
                  Available Facilities
                </Typography>
                <List>
                  {selectedRoom.facilities.map((facility, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={facility} />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>

              <TabPanel value={activeTab} index={3}>
                <Typography variant="h6" gutterBottom>
                  Maintenance Issues
                </Typography>
                {selectedRoom.maintenanceIssues.length > 0 ? (
                  <List>
                    {selectedRoom.maintenanceIssues.map((issue, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <WarningIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText primary={issue} />
                        <Button variant="outlined" size="small" color="warning">
                          Report
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No maintenance issues reported.
                  </Typography>
                )}
              </TabPanel>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained" color="secondary">
            Edit Room
          </Button>
          <Button variant="contained" color="primary">
            Assign Student
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Hostels;

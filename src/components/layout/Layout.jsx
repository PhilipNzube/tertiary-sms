import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
  CssBaseline,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Book as BookIcon,
  Payment as PaymentIcon,
  Home as HomeIcon,
  Description as DescriptionIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout,
  AdminPanelSettings,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const Layout = ({ children, userRole, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    onLogout();
  };

  const getMenuItems = () => {
    const baseItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    ];

    const roleBasedItems = {
      admin: [
        { text: 'Admissions', icon: <SchoolIcon />, path: '/admissions' },
        { text: 'Students', icon: <PeopleIcon />, path: '/students' },
        { text: 'Courses', icon: <BookIcon />, path: '/courses' },
        { text: 'Payments', icon: <PaymentIcon />, path: '/payments' },
        { text: 'Hostels', icon: <HomeIcon />, path: '/hostels' },
        { text: 'Transcripts', icon: <DescriptionIcon />, path: '/transcripts' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
      ],
      registrar: [
        { text: 'Admissions', icon: <SchoolIcon />, path: '/admissions' },
        { text: 'Students', icon: <PeopleIcon />, path: '/students' },
        { text: 'Courses', icon: <BookIcon />, path: '/courses' },
        { text: 'Transcripts', icon: <DescriptionIcon />, path: '/transcripts' },
      ],
      finance: [
        { text: 'Students', icon: <PeopleIcon />, path: '/students' },
        { text: 'Payments', icon: <PaymentIcon />, path: '/payments' },
      ],
      lecturer: [
        { text: 'Students', icon: <PeopleIcon />, path: '/students' },
        { text: 'Courses', icon: <BookIcon />, path: '/courses' },
      ],
      student: [
        { text: 'Courses', icon: <BookIcon />, path: '/courses' },
        { text: 'Payments', icon: <PaymentIcon />, path: '/payments' },
        { text: 'Hostels', icon: <HomeIcon />, path: '/hostels' },
        { text: 'Transcripts', icon: <DescriptionIcon />, path: '/transcripts' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
      ],
      applicant: [
        { text: 'Admissions', icon: <SchoolIcon />, path: '/admissions' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
      ],
    };

    return [...baseItems, ...(roleBasedItems[userRole] || [])];
  };

  const menuItems = getMenuItems();

  const getRoleDisplayName = (role) => {
    const roleNames = {
      admin: 'Super Administrator',
      registrar: 'Registrar',
      finance: 'Finance Staff',
      lecturer: 'Lecturer',
      student: 'Student',
      applicant: 'Applicant',
    };
    return roleNames[role] || role;
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: { xs: 1.5, sm: 2 }, 
        bgcolor: 'primary.main', 
        color: 'white',
        minHeight: { xs: 64, sm: 80 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ 
            mr: 1,
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }} />
          <Typography 
            variant="h6" 
            noWrap
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            Tertiary SMS
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            opacity: 0.8, 
            mt: 0.5,
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        >
          {getRoleDisplayName(userRole)}
        </Typography>
      </Box>
      
      <List sx={{ 
        flexGrow: 1, 
        pt: 2,
        px: { xs: 0.5, sm: 1 }
      }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mx: { xs: 0.5, sm: 1 },
                borderRadius: 1,
                py: { xs: 0.5, sm: 1 },
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: { xs: 36, sm: 40 },
                '& .MuiSvgIcon-root': {
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 1,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1, sm: 2 }
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ 
                width: { xs: 28, sm: 32 }, 
                height: { xs: 28, sm: 32 }, 
                bgcolor: 'primary.main' 
              }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <AdminPanelSettings />
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              John Doe
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {getRoleDisplayName(userRole)}
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, sm: 8 },
          minHeight: 'calc(100vh - 64px)',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

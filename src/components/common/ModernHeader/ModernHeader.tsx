import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Cloud as CloudIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { useNotificationStore } from '@/store/notificationStore';
import { ThemeToggle } from '@/theme/ThemeToggle/ThemeToggle';
import { useLocation } from 'react-router-dom';
import { modernHeaderStyles } from './ModernHeader.styles';

interface ModernHeaderProps {}

export const ModernHeader: React.FC<ModernHeaderProps> = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotificationStore();
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const notificationOpen = Boolean(notificationAnchor);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setNotificationAnchor(null);
  };

  const handleNotificationItemClick = (notificationId: string) => {
    markAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    handleClose();
  };

  const handleRemoveNotification = (notificationId: string) => {
    removeNotification(notificationId);
  };

  const getNotificationIcon = (type: string, severity: string) => {
    if (severity === 'critical') return <ErrorIcon color="error" />;
    if (severity === 'high') return <WarningIcon color="warning" />;
    if (type === 'info') return <InfoIcon color="info" />;
    return <CheckCircleIcon color="success" />;
  };

  const getCurrentPageName = () => {
    if (location.pathname === '/dashboard') return 'CloudOps Dashboard';
    if (location.pathname === '/inventory') return 'CloudOps Inventory';
    return 'CloudOps Dashboard';
  };


  return (
    <>
      {/* Main Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderBottomColor: 'divider',
        }}
      >
        <Toolbar sx={{ minHeight: 64, pl: 0, pr: 3 }}>
          {/* Left Section - Logo and App Name */}
          <Box sx={modernHeaderStyles.leftSection}>
            {/* Logo */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CloudIcon sx={{ color: 'white', fontSize: 20 }} />
            </Box>

            {/* App Name */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '1.25rem',
                color: 'text.primary',
                letterSpacing: '-0.01em',
              }}
            >
              MontyCloud Pulse
            </Typography>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            {/* Cloud Icon and Page Name */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CloudIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              >
                {getCurrentPageName()}
              </Typography>
            </Box>
          </Box>

          {/* Right Section - Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            {/* Business Icon and Account Dropdown */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BusinessIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: 'text.primary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                AWS Inc
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            {/* Notifications */}
            <IconButton
              size="small"
              onClick={handleNotificationClick}
              sx={{ color: 'text.secondary' }}
            >
              <Badge badgeContent={unreadCount} color="error" max={99}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Theme Toggle */}
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>


      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={notificationOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 500,
            mt: 1,
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Button size="small" onClick={handleMarkAllAsRead}>
                Mark all as read
              </Button>
            )}
          </Box>
        </Box>

        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {notifications.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No notifications
              </Typography>
            </Box>
          ) : (
            notifications.slice(0, 10).map((notification, index) => (
              <React.Fragment key={notification.id}>
                <MenuItem
                  onClick={() => handleNotificationItemClick(notification.id)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    backgroundColor: notification.read ? 'transparent' : 'action.hover',
                    '&:hover': {
                      backgroundColor: 'action.selected',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {getNotificationIcon(notification.type, notification.severity)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        fontWeight={notification.read ? 400 : 600}
                        color="text.primary"
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', mb: 0.5 }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.disabled"
                        >
                          {notification.timestamp.toLocaleTimeString()}
                        </Typography>
                      </Box>
                    }
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveNotification(notification.id);
                    }}
                    sx={{ ml: 1 }}
                  >
                    <Typography variant="caption" color="text.disabled">
                      ×
                    </Typography>
                  </IconButton>
                </MenuItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </Box>
      </Menu>

    </>
  );
};

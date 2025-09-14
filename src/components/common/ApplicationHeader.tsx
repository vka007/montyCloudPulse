import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Tooltip,
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
} from '@mui/icons-material';
import { useNotificationStore } from '@/store/notificationStore';

interface ProfessionalHeaderProps {
  title: string;
  subtitle: string;
}

export const ProfessionalHeader: React.FC<ProfessionalHeaderProps> = ({ 
  title, 
  subtitle
}) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotificationStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notificationId: string) => {
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


  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      width: '100%'
    }}>
      {/* Left Section - Title and Subtitle */}
      <Box sx={{ flex: 1 }}>
        <Typography 
          variant="h4"
          sx={{ 
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'text.primary',
            lineHeight: 1.2,
            mb: 0.5,
            letterSpacing: '-0.02em'
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="subtitle1"
          sx={{ 
            fontSize: '1rem',
            color: 'text.secondary',
            lineHeight: 1.5,
            fontWeight: 400
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Right Section - Notifications */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ 
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <Badge badgeContent={unreadCount} color="error" max={99}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
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
                    onClick={() => handleNotificationClick(notification.id)}
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
      </Box>
    </Box>
  );
};

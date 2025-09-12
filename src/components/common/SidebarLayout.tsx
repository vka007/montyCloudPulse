import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  Dashboard,
  Storage,
  Cloud,
} from '@mui/icons-material';
import { ThemeToggle } from './ThemeToggle';
import { sidebarLayoutStyles } from './SidebarLayout.styles';

interface SidebarLayoutProps {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    id: 'inventory',
    label: 'Resource Inventory',
    icon: <Storage />,
  },
];

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  headerContent,
  activeTab,
  onTabChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box sx={sidebarLayoutStyles.root}>
      {/* Sidebar */}
      <Box
        sx={{
          width: isHovered ? 200 : 56,
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e293b' : '#1e293b',
          transition: 'width 0.3s ease-in-out',
          position: 'relative',
          zIndex: 1200,
          borderRight: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Sidebar Header */}
        <Box sx={sidebarLayoutStyles.sidebarHeader}>
          <Box sx={sidebarLayoutStyles.logo}>
            <Box sx={sidebarLayoutStyles.logoIcon}>
              <Cloud sx={{ fontSize: '1.1rem' }} />
            </Box>
            <Typography
              sx={{
                fontSize: '0.95rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                ml: 1,
                color: 'white',
              }}
            >
              MontyCloud Pulse
            </Typography>
          </Box>
        </Box>

        {/* Navigation */}
        <Box sx={sidebarLayoutStyles.navigation}>
          {navigationItems.map((item) => (
            <Tooltip
              key={item.id}
              title={!isHovered ? item.label : ''}
              placement="right"
              arrow
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 12px',
                  color: activeTab === item.id ? '#3b82f6' : 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                  borderRadius: 0,
                  backgroundColor: activeTab === item.id ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                  borderRight: activeTab === item.id ? '3px solid #3b82f6' : 'none',
                  '&:hover': {
                    backgroundColor: activeTab === item.id ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    color: activeTab === item.id ? '#3b82f6' : 'white',
                  },
                }}
                onClick={() => onTabChange(item.id)}
              >
                <Box sx={sidebarLayoutStyles.navIcon}>
                  {React.cloneElement(item.icon, { sx: { fontSize: '1.1rem' } })}
                </Box>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    ml: 1.5,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={sidebarLayoutStyles.mainContent}>
        {/* Top Bar */}
        <Box sx={sidebarLayoutStyles.topBar}>
          <Box sx={sidebarLayoutStyles.topBarContent}>
            {headerContent}
          </Box>
          
          <Box sx={sidebarLayoutStyles.topBarActions}>
            <ThemeToggle />
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={sidebarLayoutStyles.contentArea}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

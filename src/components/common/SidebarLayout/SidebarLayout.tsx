import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  Dashboard,
  Storage,
} from '@mui/icons-material';
import { sidebarLayoutStyles } from './SidebarLayout.styles';

interface SidebarLayoutProps {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  noPadding?: boolean;
}

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: <Storage />,
  },
];

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  headerContent,
  activeTab,
  onTabChange,
  noPadding = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box sx={sidebarLayoutStyles.root}>
      {/* Header Content */}
      {headerContent}

      {/* Main Content Area with Sidebar */}
      <Box sx={sidebarLayoutStyles.contentWrapper}>
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
                  {React.cloneElement(item.icon, { sx: { fontSize: '1.375rem' } })}
                </Box>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    ml: 1.5,
                    color: 'inherit',
                    letterSpacing: '0.01em',
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
          {/* Content Area */}
          <Box sx={{
            ...sidebarLayoutStyles.contentArea,
            padding: noPadding ? 0 : '20px',
          }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

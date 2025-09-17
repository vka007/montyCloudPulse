import { SxProps, Theme } from '@mui/material/styles';

export const sidebarLayoutStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  } as SxProps<Theme>,

  contentWrapper: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  } as SxProps<Theme>,

  sidebar: {
    width: 80, // Collapsed width
    backgroundColor: '#1e293b', // Dark sidebar
    transition: 'width 0.3s ease-in-out',
    position: 'relative',
    zIndex: 1200,
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    '&:hover': {
      width: 240, // Expanded width
    },
  } as SxProps<Theme>,

  sidebarExpanded: {
    width: 240,
  } as SxProps<Theme>,


  navigation: {
    padding: '12px 0',
    flex: 1,
  } as SxProps<Theme>,

  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
    },
  } as SxProps<Theme>,

  navItemActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    color: '#3b82f6',
    borderRight: '3px solid #3b82f6',
    '&:hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.3)',
      color: '#3b82f6',
    },
  } as SxProps<Theme>,

  navIcon: {
    fontSize: '1.1rem',
    minWidth: 28,
    display: 'flex',
    justifyContent: 'center',
  } as SxProps<Theme>,

  navText: {
    fontSize: '0.85rem',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    ml: 1.5,
  } as SxProps<Theme>,

  navTextVisible: {
    opacity: 1,
  } as SxProps<Theme>,

  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'background.default',
    overflow: 'hidden',
  } as SxProps<Theme>,

  contentArea: {
    flex: 1,
    padding: '20px',
    overflow: 'auto',
    backgroundColor: 'background.default',
  } as SxProps<Theme>,

  // Hover effect styles
  sidebarHover: {
    '& .sidebar-text': {
      opacity: 1,
    },
  } as SxProps<Theme>,
};

import { SxProps, Theme } from '@mui/material/styles';

export const sidebarLayoutStyles = {
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  } as SxProps<Theme>,

  sidebar: {
    width: 64, // Collapsed width
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

  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    minHeight: 64,
  } as SxProps<Theme>,

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    color: 'white',
    textDecoration: 'none',
    width: '100%',
  } as SxProps<Theme>,

  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#3b82f6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    flexShrink: 0,
  } as SxProps<Theme>,

  logoText: {
    fontSize: '1.1rem',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    ml: 1,
  } as SxProps<Theme>,

  logoTextVisible: {
    opacity: 1,
  } as SxProps<Theme>,

  navigation: {
    padding: '16px 0',
    flex: 1,
  } as SxProps<Theme>,

  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
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
    fontSize: '1.3rem',
    minWidth: 32,
    display: 'flex',
    justifyContent: 'center',
  } as SxProps<Theme>,

  navText: {
    fontSize: '0.9rem',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    ml: 2,
  } as SxProps<Theme>,

  navTextVisible: {
    opacity: 1,
  } as SxProps<Theme>,

  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  } as SxProps<Theme>,

  topBar: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0',
    padding: '0 24px',
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  } as SxProps<Theme>,

  topBarContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    flex: 1,
  } as SxProps<Theme>,

  pageTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#1e293b',
  } as SxProps<Theme>,

  pageSubtitle: {
    fontSize: '0.9rem',
    color: '#64748b',
    mt: 0.5,
  } as SxProps<Theme>,

  topBarActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  } as SxProps<Theme>,

  contentArea: {
    flex: 1,
    padding: '24px',
    overflow: 'auto',
    backgroundColor: '#f8fafc',
  } as SxProps<Theme>,

  // Hover effect styles
  sidebarHover: {
    '& .sidebar-text': {
      opacity: 1,
    },
  } as SxProps<Theme>,
};

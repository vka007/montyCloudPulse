export const applicationHeaderStyles = {
  appBar: {
    backgroundColor: 'background.paper',
    color: 'text.primary',
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    zIndex: 1200,
  },
  toolbar: {
    minHeight: 64,
    px: { xs: 2, sm: 3 },
    justifyContent: 'space-between',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    textDecoration: 'none',
    color: 'inherit',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 1,
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  tagline: {
    fontSize: '0.75rem',
    color: 'text.secondary',
    fontWeight: 500,
    letterSpacing: '0.02em',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  notificationButton: {
    position: 'relative',
    '& .MuiBadge-badge': {
      backgroundColor: 'error.main',
      color: 'white',
      fontSize: '0.75rem',
      fontWeight: 600,
    },
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    ml: 2,
  },
  userAvatar: {
    width: 32,
    height: 32,
    backgroundColor: 'primary.main',
    fontSize: '0.875rem',
    fontWeight: 600,
  },
  userInfo: {
    display: { xs: 'none', sm: 'flex' },
    flexDirection: 'column',
    alignItems: 'flex-start',
    ml: 1,
  },
  userName: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'text.primary',
    lineHeight: 1.2,
  },
  userRole: {
    fontSize: '0.75rem',
    color: 'text.secondary',
    lineHeight: 1.2,
  },
  menuButton: {
    ml: 1,
    color: 'text.secondary',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  menuItem: {
    py: 1,
    px: 2,
    minWidth: 200,
  },
  menuItemIcon: {
    mr: 2,
    color: 'text.secondary',
  },
  menuItemText: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  divider: {
    my: 1,
  },
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    px: 1.5,
    py: 0.5,
    borderRadius: 1,
    backgroundColor: 'success.light',
    color: 'success.contrastText',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    animation: 'pulse 2s infinite',
    '@keyframes pulse': {
      '0%': {
        opacity: 1,
      },
      '50%': {
        opacity: 0.5,
      },
      '100%': {
        opacity: 1,
      },
    },
  },
  searchContainer: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    gap: 1,
    ml: 3,
  },
  searchInput: {
    minWidth: 200,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: 'background.default',
      '& fieldset': {
        borderColor: 'divider',
      },
      '&:hover fieldset': {
        borderColor: 'primary.main',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
      },
    },
    '& .MuiInputBase-input': {
      py: 1,
      fontSize: '0.875rem',
    },
  },
  searchIcon: {
    color: 'text.secondary',
    fontSize: '1.25rem',
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  actionButton: {
    minWidth: 'auto',
    px: 1.5,
    py: 1,
    borderRadius: 2,
    color: 'text.secondary',
    '&:hover': {
      backgroundColor: 'action.hover',
      color: 'text.primary',
    },
  },
  actionButtonIcon: {
    fontSize: '1.25rem',
  },
  actionButtonText: {
    fontSize: '0.75rem',
    fontWeight: 500,
    ml: 0.5,
  },
  mobileMenu: {
    display: { xs: 'flex', md: 'none' },
    flexDirection: 'column',
    gap: 1,
  },
  mobileMenuItem: {
    py: 1,
    px: 2,
    borderRadius: 1,
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  mobileMenuItemIcon: {
    mr: 2,
    color: 'text.secondary',
  },
  mobileMenuItemText: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
};

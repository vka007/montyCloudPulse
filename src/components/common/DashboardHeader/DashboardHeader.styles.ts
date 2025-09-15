export const dashboardHeaderStyles = {
  header: {
    backgroundColor: 'background.paper',
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1100,
  },
  toolbar: {
    minHeight: 56,
    px: { xs: 2, sm: 3 },
    justifyContent: 'space-between',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  title: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: 'text.primary',
    letterSpacing: '-0.01em',
  },
  breadcrumbs: {
    display: { xs: 'none', sm: 'flex' },
    alignItems: 'center',
    gap: 0.5,
    ml: 2,
  },
  breadcrumbLink: {
    fontSize: '0.875rem',
    color: 'text.secondary',
    textDecoration: 'none',
    '&:hover': {
      color: 'primary.main',
      textDecoration: 'underline',
    },
  },
  breadcrumbSeparator: {
    color: 'text.disabled',
    fontSize: '0.875rem',
  },
  breadcrumbCurrent: {
    fontSize: '0.875rem',
    color: 'text.primary',
    fontWeight: 500,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  refreshButton: {
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
  refreshIcon: {
    fontSize: '1.25rem',
  },
  refreshText: {
    fontSize: '0.75rem',
    fontWeight: 500,
    ml: 0.5,
    display: { xs: 'none', sm: 'block' },
  },
  lastUpdated: {
    fontSize: '0.75rem',
    color: 'text.secondary',
    display: { xs: 'none', md: 'block' },
    ml: 2,
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
    ml: 2,
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
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    ml: 2,
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
    display: { xs: 'none', sm: 'block' },
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
  loadingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    ml: 2,
  },
  loadingText: {
    fontSize: '0.75rem',
    color: 'text.secondary',
  },
  loadingSpinner: {
    width: 16,
    height: 16,
    color: 'primary.main',
  },
};

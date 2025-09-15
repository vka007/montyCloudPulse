export const themeToggleStyles = {
  toggleButton: {
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
  toggleIcon: {
    fontSize: '1.25rem',
  },
  toggleText: {
    fontSize: '0.75rem',
    fontWeight: 500,
    ml: 0.5,
    display: { xs: 'none', sm: 'block' },
  },
  menu: {
    '& .MuiPaper-root': {
      borderRadius: 2,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      border: '1px solid',
      borderColor: 'divider',
    },
  },
  menuItem: {
    py: 1,
    px: 2,
    minWidth: 160,
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  menuItemIcon: {
    mr: 2,
    color: 'text.secondary',
    fontSize: '1.25rem',
  },
  menuItemText: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  menuItemSelected: {
    backgroundColor: 'primary.light',
    color: 'primary.contrastText',
    '&:hover': {
      backgroundColor: 'primary.main',
    },
  },
  menuItemSelectedIcon: {
    color: 'primary.contrastText',
  },
  menuItemSelectedText: {
    color: 'primary.contrastText',
    fontWeight: 600,
  },
  divider: {
    my: 1,
  },
  systemOption: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    py: 1,
    px: 2,
    borderRadius: 1,
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  systemIcon: {
    fontSize: '1rem',
    color: 'text.secondary',
  },
  systemText: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  systemDescription: {
    fontSize: '0.75rem',
    color: 'text.secondary',
    ml: 2,
  },
};

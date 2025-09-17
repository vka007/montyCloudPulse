export const modernHeaderStyles = {
  appBar: {
    backgroundColor: 'background.paper',
    color: 'text.primary',
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
    boxShadow: 'none',
  },
  toolbar: {
    minHeight: 64,
    pl: 0,
    pr: 3,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    color: 'white',
    fontSize: 20,
  },
  appName: {
    fontWeight: 600,
    fontSize: '1.25rem',
    color: 'text.primary',
    letterSpacing: '-0.01em',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    pl: 0,
    marginLeft: -2,
  },
  pageSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  pageName: {
    fontWeight: 500,
    color: 'text.primary',
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    ml: 'auto',
  },
  vmChip: {
    backgroundColor: 'grey.100',
    color: 'text.primary',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'grey.200',
    },
  },
  accountSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  accountName: {
    fontWeight: 500,
    color: 'text.primary',
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    cursor: 'pointer',
  },
  notificationMenu: {
    width: 400,
    maxHeight: 500,
    mt: 1,
  },
  accountMenu: {
    width: 250,
    mt: 1,
  },
  menuHeader: {
    p: 2,
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
  },
  menuTitle: {
    fontWeight: 600,
  },
  notificationItem: {
    py: 1.5,
    px: 2,
    '&:hover': {
      backgroundColor: 'action.selected',
    },
  },
  unreadNotification: {
    backgroundColor: 'action.hover',
  },
  notificationIcon: {
    minWidth: 40,
  },
  notificationTitle: {
    fontWeight: 600,
    color: 'text.primary',
  },
  notificationMessage: {
    color: 'text.secondary',
    display: 'block',
    mb: 0.5,
  },
  notificationTime: {
    color: 'text.disabled',
  },
};

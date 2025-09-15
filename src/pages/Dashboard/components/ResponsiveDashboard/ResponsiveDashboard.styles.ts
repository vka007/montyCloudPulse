export const responsiveDashboardStyles = {
  dashboardLayout: {
    display: 'flex',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  leftSidebar: {
    width: 320,
    minWidth: 320,
    maxWidth: 320,
    borderRight: '1px solid',
    borderRightColor: 'divider',
    backgroundColor: 'background.paper',
    overflowY: 'auto',
    p: 2,
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    p: 3,
    gap: 3, // Consistent spacing between all sections
  },
  container: {
    py: 3,
    px: { xs: 2, sm: 3 },
    backgroundColor: 'background.default',
    minHeight: '100vh',
  },
  loadingBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1300,
  },
  tabsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 2,
    backgroundColor: 'background.paper',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  tabs: {
    '& .MuiTab-root': {
      minHeight: 48,
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.95rem',
      color: 'text.secondary',
      '&.Mui-selected': {
        color: 'primary.main',
        fontWeight: 700,
      },
    },
    '& .MuiTabs-indicator': {
      height: 3,
      borderRadius: '2px 2px 0 0',
      backgroundColor: 'primary.main',
    },
  },
  tab: {
    gap: 1,
  },
  metricPaper: {
    p: 2,
    borderRadius: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
  },
  chartPaper: {
    p: 3,
    borderRadius: 2,
    height: '100%',
    backgroundColor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
  },
  accordion: {
    borderRadius: 2,
    '&:before': {
      display: 'none',
    },
    '& .MuiAccordionSummary-root': {
      backgroundColor: 'action.hover',
      borderRadius: '8px 8px 0 0',
      '&:hover': {
        backgroundColor: 'action.selected',
      },
    },
    '& .MuiAccordionDetails-root': {
      p: 3,
      borderTop: '1px solid',
      borderTopColor: 'divider',
    },
  },
};

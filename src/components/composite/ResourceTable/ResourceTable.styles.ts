export const resourceTableStyles = {
  container: {
    mt: 1,
  },
  searchContainer: {
    mb: 3,
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchField: {
    minWidth: 300,
    flexGrow: 1,
  },
  filterContainer: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  filterSelect: {
    minWidth: 120,
  },
  metricCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  metricValue: {
    fontWeight: 500,
    minWidth: 40,
  },
  actionButton: {
    minWidth: 'auto',
    p: 1,
  },
  emptyState: {
    textAlign: 'center',
    py: 8,
  },
  summaryCards: {
    mb: 3,
  },
  summaryValue: {
    fontSize: '1.5rem',
    fontWeight: 600,
    mb: 0.5,
  },
  summaryLabel: {
    color: 'text.secondary',
    fontSize: '0.875rem',
  },
  tableContainer: {
    mt: 2,
    '& .MuiTableContainer-root': {
      backgroundColor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
    },
  },
  tableHeader: {
    backgroundColor: 'background.paper',
    '& .MuiTableCell-head': {
      backgroundColor: 'background.paper',
      color: 'text.primary',
      fontWeight: 600,
      borderBottom: '1px solid',
      borderBottomColor: 'divider',
    },
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'action.hover',
    },
    '&:hover': {
      backgroundColor: 'action.selected',
    },
    '& .MuiTableCell-root': {
      borderBottom: '1px solid',
      borderBottomColor: 'divider',
      color: 'text.primary',
    },
  },
};

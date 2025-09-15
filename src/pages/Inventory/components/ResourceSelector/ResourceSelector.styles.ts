export const resourceSelectorStyles = {
  container: {
    p: 2,
    borderRadius: 2,
    backgroundColor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    height: 'fit-content',
  },
  header: {
    mb: 3,
  },
  title: {
    fontWeight: 700,
    color: 'text.primary',
    mb: 0.5,
    fontSize: '1rem',
  },
  subtitle: {
    color: 'text.secondary',
    fontSize: '0.875rem',
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mb: 2,
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  filterLabel: {
    fontWeight: 600,
    color: 'text.primary',
    fontSize: '0.8125rem',
    mb: 0.5,
  },
  select: {
    '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    width: '100%',
  },
  resourceMenuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    width: '100%',
    py: 0.5,
  },
  resourceInfo: {
    flex: 1,
    minWidth: 0,
  },
  resourceName: {
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  resourceDetails: {
    color: 'text.secondary',
    display: 'block',
  },
  statusChip: {
    minWidth: 'auto',
    height: 20,
    fontSize: '0.6875rem',
    fontWeight: 600,
  },
  selectedResourceSummary: {
    mt: 3,
    p: 2,
    borderRadius: 2,
    backgroundColor: 'action.hover',
    border: '1px solid',
    borderColor: 'divider',
  },
  summaryTitle: {
    fontWeight: 600,
    mb: 2,
    color: 'text.primary',
  },
  summaryContent: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 3,
    alignItems: 'center',
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    minWidth: 'fit-content',
  },
  filterSummary: {
    mt: 2,
    pt: 2,
    borderTop: '1px solid',
    borderTopColor: 'divider',
  },
};

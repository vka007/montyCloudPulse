import { SxProps, Theme } from '@mui/material/styles';

export const resourceTableStyles = {
  container: {
    mt: 2,
  } as SxProps<Theme>,

  searchContainer: {
    mb: 3,
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    flexWrap: 'wrap',
  } as SxProps<Theme>,

  searchField: {
    minWidth: 300,
    flexGrow: 1,
  } as SxProps<Theme>,

  filterContainer: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
    alignItems: 'center',
  } as SxProps<Theme>,

  filterSelect: {
    minWidth: 120,
  } as SxProps<Theme>,

  tableContainer: {
    mt: 2,
  } as SxProps<Theme>,

  statusChip: {
    minWidth: 80,
    fontWeight: 500,
  } as SxProps<Theme>,

  metricCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  } as SxProps<Theme>,

  metricValue: {
    fontWeight: 500,
    minWidth: 40,
  } as SxProps<Theme>,

  metricBar: {
    width: 60,
    height: 6,
    borderRadius: 3,
  } as SxProps<Theme>,

  actionButton: {
    minWidth: 'auto',
    p: 1,
  } as SxProps<Theme>,

  emptyState: {
    textAlign: 'center',
    py: 8,
  } as SxProps<Theme>,

  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    py: 4,
  } as SxProps<Theme>,

  summaryCards: {
    mb: 3,
  } as SxProps<Theme>,

  summaryCard: {
    p: 2,
    textAlign: 'center',
  } as SxProps<Theme>,

  summaryValue: {
    fontSize: '1.5rem',
    fontWeight: 600,
    mb: 0.5,
  } as SxProps<Theme>,

  summaryLabel: {
    color: 'text.secondary',
    fontSize: '0.875rem',
  } as SxProps<Theme>,
};

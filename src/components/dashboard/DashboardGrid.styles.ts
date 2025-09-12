import { SxProps, Theme } from '@mui/material/styles';

export const dashboardGridStyles = {
  container: {
    mt: 0,
  } as SxProps<Theme>,

  metricsGrid: {
    mb: 3,
  } as SxProps<Theme>,

  sectionTitle: {
    mb: 2,
    fontWeight: 600,
  } as SxProps<Theme>,

  gridItem: {
    height: '100%',
  } as SxProps<Theme>,

  refreshButton: {
    mb: 2,
  } as SxProps<Theme>,

  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  } as SxProps<Theme>,

  errorContainer: {
    textAlign: 'center',
    p: 4,
  } as SxProps<Theme>,

  errorText: {
    mb: 2,
    color: 'error.main',
  } as SxProps<Theme>,
};

import { SxProps, Theme } from '@mui/material/styles';

export const dashboardStyles = {
  root: {
    // Root container styles can be added here if needed
  } as SxProps<Theme>,

  title: {
    // Title styles can be added here if needed (using gutterBottom prop instead)
  } as SxProps<Theme>,

  welcomeCard: {
    p: 3,
    mt: 2,
    textAlign: 'center',
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,

  welcomeTitle: {
    color: 'text.secondary',
  } as SxProps<Theme>,

  welcomeSubtitle: {
    mt: 1,
  } as SxProps<Theme>,
};

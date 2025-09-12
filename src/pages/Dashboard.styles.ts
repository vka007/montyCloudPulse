import { SxProps, Theme } from '@mui/material/styles';

export const dashboardStyles = {
  root: {
    // Root container styles can be added here if needed
  } as SxProps<Theme>,

  title: {
    mb: 1,
  } as SxProps<Theme>,

  subtitle: {
    color: 'text.secondary',
    mb: 3,
  } as SxProps<Theme>,

  content: {
    mt: 2,
  } as SxProps<Theme>,
};

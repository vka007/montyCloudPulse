import { SxProps, Theme } from '@mui/material/styles';

export const layoutStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  } as SxProps<Theme>,

  appBar: {
    position: 'static',
    elevation: 1,
  },

  toolbar: {
    // Toolbar styles can be added here if needed
  },

  title: {
    flexGrow: 1,
  } as SxProps<Theme>,

  container: {
    flex: 1,
    py: 3,
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,
};

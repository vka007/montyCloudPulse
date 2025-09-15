import { SxProps, Theme } from '@mui/material/styles';

export const navigationStyles = {
  tabsContainer: {
    borderBottom: 1,
    borderColor: 'divider',
    mb: 3,
  } as SxProps<Theme>,

  tab: {
    minHeight: 64,
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
  } as SxProps<Theme>,

  tabPanel: {
    pt: 0,
  } as SxProps<Theme>,

  header: {
    mb: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as SxProps<Theme>,

  title: {
    fontWeight: 600,
  } as SxProps<Theme>,

  subtitle: {
    color: 'text.secondary',
    mt: 0.5,
  } as SxProps<Theme>,

  controls: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  } as SxProps<Theme>,
};

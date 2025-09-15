import { SxProps, Theme } from '@mui/material/styles';

// Common styles that can be reused across components
export const commonStyles = {
  // Flexbox utilities
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,

  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as SxProps<Theme>,

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,

  // Spacing utilities
  fullHeight: {
    height: '100%',
  } as SxProps<Theme>,

  fullWidth: {
    width: '100%',
  } as SxProps<Theme>,

  // Text utilities
  textCenter: {
    textAlign: 'center',
  } as SxProps<Theme>,

  // Card styles
  card: {
    p: 2,
    borderRadius: 2,
    boxShadow: 1,
  } as SxProps<Theme>,

  cardElevated: {
    p: 3,
    borderRadius: 2,
    boxShadow: 3,
  } as SxProps<Theme>,
};

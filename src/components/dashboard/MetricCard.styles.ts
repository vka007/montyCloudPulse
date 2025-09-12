import { SxProps, Theme } from '@mui/material/styles';

export const metricCardStyles = {
  card: {
    p: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 4,
    },
  } as SxProps<Theme>,

  liveIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'success.main',
    animation: 'pulse 2s infinite',
    '@keyframes pulse': {
      '0%': {
        transform: 'scale(0.95)',
        boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)',
      },
      '70%': {
        transform: 'scale(1)',
        boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)',
      },
      '100%': {
        transform: 'scale(0.95)',
        boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
      },
    },
  } as SxProps<Theme>,

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 2,
  } as SxProps<Theme>,

  title: {
    color: 'text.secondary',
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  } as SxProps<Theme>,

  icon: {
    fontSize: '1.5rem',
    opacity: 0.7,
  } as SxProps<Theme>,

  valueContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  } as SxProps<Theme>,

  value: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1,
    mb: 1,
  } as SxProps<Theme>,

  subtitle: {
    color: 'text.secondary',
    fontSize: '0.875rem',
    mb: 2,
  } as SxProps<Theme>,

  trendContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  } as SxProps<Theme>,

  trendIcon: {
    fontSize: '1rem',
  } as SxProps<Theme>,

  trendText: {
    fontSize: '0.75rem',
    fontWeight: 500,
  } as SxProps<Theme>,

  additionalInfo: {
    mt: 'auto',
    pt: 2,
  } as SxProps<Theme>,

  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 0.5,
  } as SxProps<Theme>,

  infoLabel: {
    fontSize: '0.85rem',
    color: 'text.secondary',
  } as SxProps<Theme>,

  infoValue: {
    fontSize: '0.85rem',
    fontWeight: 500,
  } as SxProps<Theme>,

  sparkline: {
    height: 40,
    mt: 1,
    mb: 1,
  } as SxProps<Theme>,

  thresholdBar: {
    height: 4,
    borderRadius: 2,
    mt: 1,
    backgroundColor: 'grey.200',
    position: 'relative',
    overflow: 'hidden',
  } as SxProps<Theme>,

  thresholdFill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 0.3s ease-in-out',
  } as SxProps<Theme>,

  lastUpdated: {
    fontSize: '0.75rem',
    color: 'text.disabled',
    textAlign: 'right',
    mt: 1,
  } as SxProps<Theme>,
};

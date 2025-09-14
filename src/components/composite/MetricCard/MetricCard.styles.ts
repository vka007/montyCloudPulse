export const metricCardStyles = {
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
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    mb: 2,
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    flex: 1,
  },
  title: {
    color: 'text.primary',
    fontSize: '0.875rem',
    fontWeight: 600,
    textTransform: 'none',
    letterSpacing: '0.01em',
    lineHeight: 1.4,
  },
  icon: {
    fontSize: '1.25rem',
    opacity: 0.8,
  },
  valueContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  value: {
    fontSize: '2.25rem',
    fontWeight: 800,
    lineHeight: 1.1,
    mb: 0.5,
    letterSpacing: '-0.02em',
    color: 'text.primary',
  },
  subtitle: {
    color: 'text.secondary',
    fontSize: '0.8125rem',
    mb: 1.5,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  trendContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    padding: '4px 8px',
    borderRadius: 1,
    backgroundColor: 'action.hover',
  },
  trendIcon: {
    fontSize: '0.875rem',
  },
  trendText: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.01em',
  },
  additionalInfo: {
    mt: 'auto',
    pt: 2,
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 0.5,
  },
  infoLabel: {
    fontSize: '0.85rem',
    color: 'text.secondary',
  },
  infoValue: {
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  miniChart: {
    height: 50,
    mt: 1,
    mb: 1,
    borderRadius: 1,
    overflow: 'hidden',
  },
  thresholdBar: {
    mt: 1.5,
  },
  lastUpdated: {
    fontSize: '0.75rem',
    color: 'text.disabled',
    textAlign: 'right',
    mt: 1,
  },
};

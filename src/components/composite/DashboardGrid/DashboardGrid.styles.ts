export const dashboardGridStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  sectionTitle: {
    fontWeight: 700,
    mb: 3,
    color: 'text.primary',
    fontSize: '1.25rem',
    letterSpacing: '-0.01em',
  },
  metricsGrid: {
    mb: 2,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    gap: 2,
  },
  errorText: {
    color: 'error.main',
    textAlign: 'center',
  },
};

export const chipStyles = {
  base: {
    borderRadius: 0.7,
    fontWeight: 600,
    fontSize: '0.80rem',
    height: 28,
    textTransform: 'capitalize' as const,
    letterSpacing: '0.05em',
    border: '1px solid transparent',
  },
  status: {
    running: {
      backgroundColor: '#10b981', // Vibrant green
      color: '#ffffff', // White text for contrast
      borderColor: '#059669', // Darker green border
      '& .MuiChip-label': {
        color: '#ffffff',
        fontWeight: 600,
      },
      // Dark mode styles
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: '#059669',
        color: '#ffffff',
        borderColor: '#047857',
        '& .MuiChip-label': {
          color: '#ffffff',
        },
      },
    },
    warning: {
      backgroundColor: '#f59e0b', // Vibrant orange
      color: '#ffffff', // White text for contrast
      borderColor: '#d97706', // Darker orange border
      '& .MuiChip-label': {
        color: '#ffffff',
        fontWeight: 600,
      },
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: '#d97706',
        color: '#ffffff',
        borderColor: '#b45309',
        '& .MuiChip-label': {
          color: '#ffffff',
        },
      },
    },
    error: {
      backgroundColor: '#ef4444', // Vibrant red
      color: '#ffffff', // White text for contrast
      borderColor: '#dc2626', // Darker red border
      '& .MuiChip-label': {
        color: '#ffffff',
        fontWeight: 600,
      },
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: '#dc2626',
        color: '#ffffff',
        borderColor: '#b91c1c',
        '& .MuiChip-label': {
          color: '#ffffff',
        },
      },
    },
    stopped: {
      backgroundColor: '#f1f5f9', // Slate 100
      color: '#475569', // Slate 600
      borderColor: '#e2e8f0', // Slate 200
      '& .MuiChip-label': {
        color: '#475569',
        fontWeight: 600,
      },
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: 'rgba(148, 163, 184, 0.15)',
        color: '#94a3b8',
        borderColor: 'rgba(148, 163, 184, 0.3)',
        '& .MuiChip-label': {
          color: '#94a3b8',
        },
      },
    },
    pending: {
      backgroundColor: '#3b82f6', // Vibrant blue
      color: '#ffffff', // White text for contrast
      borderColor: '#2563eb', // Darker blue border
      '& .MuiChip-label': {
        color: '#ffffff',
        fontWeight: 600,
      },
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: '#2563eb',
        color: '#ffffff',
        borderColor: '#1d4ed8',
        '& .MuiChip-label': {
          color: '#ffffff',
        },
      },
    },
    terminated: {
      backgroundColor: '#ef4444', // Vibrant red (same as error)
      color: '#ffffff', // White text for contrast
      borderColor: '#dc2626', // Darker red border
      '& .MuiChip-label': {
        color: '#ffffff',
        fontWeight: 600,
      },
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: '#dc2626',
        color: '#ffffff',
        borderColor: '#b91c1c',
        '& .MuiChip-label': {
          color: '#ffffff',
        },
      },
    },
  },
};

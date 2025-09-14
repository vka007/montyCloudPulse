export const chipStyles = {
  base: {
    borderRadius: 6,
    fontWeight: 600,
    fontSize: '0.75rem',
    height: 28,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    border: '1px solid transparent',
  },
  status: {
    running: {
      backgroundColor: '#d1fae5', // Emerald 100
      color: '#065f46', // Emerald 800
      borderColor: '#a7f3d0', // Emerald 200
      '& .MuiChip-label': {
        color: '#065f46',
        fontWeight: 600,
      },
      // Dark mode styles
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: 'rgba(52, 211, 153, 0.15)',
        color: '#6ee7b7',
        borderColor: 'rgba(52, 211, 153, 0.3)',
        '& .MuiChip-label': {
          color: '#6ee7b7',
        },
      },
    },
    warning: {
      backgroundColor: '#fef3c7', // Amber 100
      color: '#92400e', // Amber 800
      borderColor: '#fde68a', // Amber 200
      '& .MuiChip-label': {
        color: '#92400e',
        fontWeight: 600,
      },
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: 'rgba(251, 191, 36, 0.15)',
        color: '#fcd34d',
        borderColor: 'rgba(251, 191, 36, 0.3)',
        '& .MuiChip-label': {
          color: '#fcd34d',
        },
      },
    },
    error: {
      backgroundColor: '#fee2e2', // Red 100
      color: '#991b1b', // Red 800
      borderColor: '#fecaca', // Red 200
      '& .MuiChip-label': {
        color: '#991b1b',
        fontWeight: 600,
      },
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: 'rgba(248, 113, 113, 0.15)',
        color: '#fca5a5',
        borderColor: 'rgba(248, 113, 113, 0.3)',
        '& .MuiChip-label': {
          color: '#fca5a5',
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
      backgroundColor: '#dbeafe', // Blue 100
      color: '#1e40af', // Blue 800
      borderColor: '#bfdbfe', // Blue 200
      '& .MuiChip-label': {
        color: '#1e40af',
        fontWeight: 600,
      },
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: 'rgba(96, 165, 250, 0.15)',
        color: '#93c5fd',
        borderColor: 'rgba(96, 165, 250, 0.3)',
        '& .MuiChip-label': {
          color: '#93c5fd',
        },
      },
    },
    terminated: {
      backgroundColor: '#fee2e2', // Red 100
      color: '#991b1b', // Red 800
      borderColor: '#fecaca', // Red 200
      '& .MuiChip-label': {
        color: '#991b1b',
        fontWeight: 600,
      },
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: 'rgba(248, 113, 113, 0.15)',
        color: '#fca5a5',
        borderColor: 'rgba(248, 113, 113, 0.3)',
        '& .MuiChip-label': {
          color: '#fca5a5',
        },
      },
    },
  },
};

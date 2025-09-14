export const buttonStyles = {
  base: {
    borderRadius: 2,
    textTransform: 'none' as const,
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: 2,
    },
  },
  sizes: {
    small: {
      padding: '6px 12px',
      fontSize: '0.875rem',
      minHeight: 32,
    },
    medium: {
      padding: '8px 16px',
      fontSize: '0.9375rem',
      minHeight: 36,
    },
    large: {
      padding: '12px 24px',
      fontSize: '1rem',
      minHeight: 44,
    },
  },
};

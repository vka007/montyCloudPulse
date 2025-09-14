export const cardStyles = {
  base: {
    borderRadius: 2,
    transition: 'all 0.2s ease-in-out',
  },
  variants: {
    default: {
      elevation: 1,
    },
    outlined: {
      elevation: 0,
      border: '1px solid',
      borderColor: 'divider',
    },
    elevated: {
      elevation: 4,
    },
  },
  sizes: {
    small: {
      minHeight: 140,
      maxHeight: 160,
    },
    medium: {
      minHeight: 180,
      maxHeight: 220,
    },
    large: {
      minHeight: 220,
      maxHeight: 280,
    },
  },
  interactive: {
    cursor: 'pointer',
    '&:hover': {
      elevation: 8,
      transform: 'translateY(-2px)',
    },
  },
  content: {
    padding: 2,
    '&:last-child': {
      paddingBottom: 2,
    },
  },
};

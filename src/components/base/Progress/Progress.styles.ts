export const progressStyles = {
  linearContainer: {
    width: '100%',
  },
  linearWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  linear: {
    base: {
      borderRadius: 1,
      backgroundColor: 'action.hover',
    },
    sizes: {
      small: {
        height: 4,
      },
      medium: {
        height: 6,
      },
      large: {
        height: 8,
      },
    },
  },
  linearValue: {
    minWidth: 35,
    fontSize: '0.75rem',
    color: 'text.secondary',
  },
  label: {
    marginBottom: 0.5,
    fontSize: '0.75rem',
    color: 'text.secondary',
  },
  circularContainer: {
    position: 'relative' as const,
    display: 'inline-flex',
  },
  circularValue: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

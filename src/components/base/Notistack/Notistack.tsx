import React from 'react';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';
import { useTheme } from '@mui/material/styles';
import './Notistack.css';

interface NotistackProps extends Omit<SnackbarProviderProps, 'children'> {
  children: React.ReactNode;
  maxNotifications?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  autoHideDuration?: number;
  preventDuplicate?: boolean;
}

export const Notistack: React.FC<NotistackProps> = ({ 
  children,
  maxNotifications = 3,
  position = 'bottom-left',
  autoHideDuration = 5000,
  preventDuplicate = true,
  ...props 
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Parse position to anchorOrigin
  const getAnchorOrigin = (pos: string) => {
    switch (pos) {
      case 'top-left':
        return { vertical: 'top' as const, horizontal: 'left' as const };
      case 'top-center':
        return { vertical: 'top' as const, horizontal: 'center' as const };
      case 'top-right':
        return { vertical: 'top' as const, horizontal: 'right' as const };
      case 'bottom-left':
        return { vertical: 'bottom' as const, horizontal: 'left' as const };
      case 'bottom-center':
        return { vertical: 'bottom' as const, horizontal: 'center' as const };
      case 'bottom-right':
        return { vertical: 'bottom' as const, horizontal: 'right' as const };
      default:
        return { vertical: 'top' as const, horizontal: 'right' as const };
    }
  };

  const defaultProps: SnackbarProviderProps = {
    maxSnack: maxNotifications,
    anchorOrigin: getAnchorOrigin(position),
    autoHideDuration,
    dense: false,
    preventDuplicate,
    // Enable close action
    action: () => (
      <button
        onClick={() => {
          // This will be handled by notistack automatically
        }}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '18px',
          cursor: 'pointer',
          padding: '0 8px',
        }}
      >
        ×
      </button>
    ),
    // Custom styling for different variants
    classes: {
      variantSuccess: isDark ? 'notistack-success-dark' : 'notistack-success',
      variantError: isDark ? 'notistack-error-dark' : 'notistack-error',
      variantWarning: isDark ? 'notistack-warning-dark' : 'notistack-warning',
      variantInfo: isDark ? 'notistack-info-dark' : 'notistack-info',
    } as any,
    ...props,
  };

  return (
    <SnackbarProvider {...defaultProps}>
      {children}
    </SnackbarProvider>
  );
};

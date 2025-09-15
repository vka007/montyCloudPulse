import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import { buttonStyles } from './Button.styles';

export interface ButtonProps extends Omit<MuiButtonProps, 'size'> {
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  size = 'medium',
  disabled,
  startIcon,
  sx,
  ...props
}) => {
  const getButtonStyles = () => {
    const baseStyle = buttonStyles.base;
    const sizeStyle = buttonStyles.sizes[size];

    return {
      ...baseStyle,
      ...sizeStyle,
      ...sx,
    };
  };

  return (
    <MuiButton
      disabled={disabled || loading}
      size={size}
      startIcon={loading ? <CircularProgress size={16} /> : startIcon}
      sx={getButtonStyles()}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

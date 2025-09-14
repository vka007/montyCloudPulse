import React from 'react';
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';
import { chipStyles } from './Chip.styles';

export interface ChipProps extends Omit<MuiChipProps, 'color'> {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  status?: 'running' | 'stopped' | 'warning' | 'error' | 'pending' | 'terminated';
}

export const Chip: React.FC<ChipProps> = ({
  color = 'default',
  status,
  sx,
  ...props
}) => {
  const getChipColor = (): MuiChipProps['color'] => {
    if (status) {
      switch (status) {
        case 'running':
          return 'success';
        case 'warning':
          return 'warning';
        case 'error':
          return 'error';
        case 'stopped':
          return 'default';
        case 'pending':
          return 'info';
        case 'terminated':
          return 'error';
        default:
          return 'default';
      }
    }
    return color as MuiChipProps['color'];
  };

  const getChipStyles = () => {
    const baseStyle = chipStyles.base;
    const statusStyle = status ? chipStyles.status[status] || {} : {};

    return {
      ...baseStyle,
      ...statusStyle,
      ...sx,
    };
  };

  return (
    <MuiChip
      color={getChipColor()}
      sx={getChipStyles()}
      {...props}
    />
  );
};

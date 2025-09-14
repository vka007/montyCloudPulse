import React from 'react';
import { LinearProgress, CircularProgress, Box, Typography } from '@mui/material';
import { progressStyles } from './Progress.styles';

export interface LinearProgressProps {
  type: 'linear';
  value?: number;
  variant?: 'determinate' | 'indeterminate';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
  label?: string;
}

export interface CircularProgressProps {
  type: 'circular';
  value?: number;
  variant?: 'determinate' | 'indeterminate';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: number;
  thickness?: number;
  showValue?: boolean;
}

export type ProgressProps = LinearProgressProps | CircularProgressProps;

export const Progress: React.FC<ProgressProps> = (props) => {
  if (props.type === 'circular') {
    const { showValue, value, ...circularProps } = props;
    
    if (showValue && value !== undefined) {
      return (
        <Box sx={progressStyles.circularContainer}>
          <CircularProgress {...circularProps} />
          <Box sx={progressStyles.circularValue}>
            <Typography variant="caption" component="div" color="text.secondary">
              {Math.round(value)}%
            </Typography>
          </Box>
        </Box>
      );
    }
    
    return <CircularProgress {...circularProps} />;
  }

  const { showValue, label, size = 'medium', value, ...linearProps } = props;
  
  const getLinearStyles = () => {
    const baseStyle = progressStyles.linear.base;
    const sizeStyle = progressStyles.linear.sizes[size];
    
    return {
      ...baseStyle,
      ...sizeStyle,
    };
  };

  return (
    <Box sx={progressStyles.linearContainer}>
      {label && (
        <Typography variant="body2" sx={progressStyles.label}>
          {label}
        </Typography>
      )}
      <Box sx={progressStyles.linearWrapper}>
        <LinearProgress
          sx={getLinearStyles()}
          value={value}
          {...linearProps}
        />
        {showValue && value !== undefined && (
          <Typography variant="body2" sx={progressStyles.linearValue}>
            {Math.round(value)}%
          </Typography>
        )}
      </Box>
    </Box>
  );
};

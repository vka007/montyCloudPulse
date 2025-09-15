import React from 'react';
import { Card as MuiCard, CardContent, CardProps as MuiCardProps } from '@mui/material';
import { cardStyles } from './Card.styles';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  interactive = false,
  sx,
  ...props
}) => {
  const getCardStyles = () => {
    const baseStyle = cardStyles.base;
    const variantStyle = cardStyles.variants[variant];
    const sizeStyle = cardStyles.sizes[size];
    const interactiveStyle = interactive ? cardStyles.interactive : {};

    return {
      ...baseStyle,
      ...variantStyle,
      ...sizeStyle,
      ...interactiveStyle,
      ...sx,
    };
  };

  return (
    <MuiCard sx={getCardStyles()} {...props}>
      <CardContent sx={cardStyles.content}>
        {children}
      </CardContent>
    </MuiCard>
  );
};

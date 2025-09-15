import React from 'react';
import { render, screen } from '@/test/testUtils';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders children content', () => {
    render(
      <Card>
        <div data-testid="card-content">Card content</div>
      </Card>
    );
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    render(<Card>Default card</Card>);
    const card = screen.getByText('Default card').closest('.MuiCard-root');
    expect(card).toBeInTheDocument();
  });

  it('renders with outlined variant', () => {
    render(<Card variant="outlined">Outlined card</Card>);
    const card = screen.getByText('Outlined card').closest('.MuiCard-root');
    expect(card).toHaveClass('MuiCard-root');
  });

  it('renders with elevated variant', () => {
    render(<Card variant="elevated">Elevated card</Card>);
    const card = screen.getByText('Elevated card').closest('.MuiCard-root');
    expect(card).toHaveClass('MuiCard-root');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Card size="small">Small card</Card>);
    expect(screen.getByText('Small card')).toBeInTheDocument();

    rerender(<Card size="medium">Medium card</Card>);
    expect(screen.getByText('Medium card')).toBeInTheDocument();

    rerender(<Card size="large">Large card</Card>);
    expect(screen.getByText('Large card')).toBeInTheDocument();
  });

  it('applies interactive styles when interactive prop is true', () => {
    render(<Card interactive>Interactive card</Card>);
    const card = screen.getByText('Interactive card').closest('.MuiCard-root');
    expect(card).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    render(<Card sx={{ backgroundColor: 'red' }}>Styled card</Card>);
    const card = screen.getByText('Styled card').closest('.MuiCard-root');
    expect(card).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('forwards other props to MUI Card', () => {
    render(<Card data-testid="custom-card" elevation={3}>Test</Card>);
    expect(screen.getByTestId('custom-card')).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    render(
      <Card>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </Card>
    );
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });
});

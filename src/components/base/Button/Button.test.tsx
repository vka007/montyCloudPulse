import { render, screen, fireEvent } from '@/test/testUtils';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state correctly', () => {
    render(<Button loading>Loading</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading is true', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    const smallButton = screen.getByRole('button');
    expect(smallButton).toHaveClass('MuiButton-sizeSmall');

    rerender(<Button size="medium">Medium</Button>);
    const mediumButton = screen.getByRole('button');
    expect(mediumButton).toHaveClass('MuiButton-sizeMedium');

    rerender(<Button size="large">Large</Button>);
    const largeButton = screen.getByRole('button');
    expect(largeButton).toHaveClass('MuiButton-sizeLarge');
  });

  it('renders with start icon', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;
    render(<Button startIcon={<TestIcon />}>With Icon</Button>);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('replaces start icon with loading spinner when loading', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;
    render(<Button loading startIcon={<TestIcon />}>Loading</Button>);
    
    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    render(<Button sx={{ backgroundColor: 'red' }}>Styled</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('forwards other props to MUI Button', () => {
    render(<Button data-testid="custom-button" variant="outlined">Test</Button>);
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    expect(screen.getByTestId('custom-button')).toHaveClass('MuiButton-outlined');
  });
});

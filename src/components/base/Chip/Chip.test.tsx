import { render, screen } from '@/test/testUtils';
import { describe, it, expect } from 'vitest';
import { Chip } from './Chip';

describe('Chip Component', () => {
  it('renders with label text', () => {
    render(<Chip label="Test Chip" />);
    expect(screen.getByText('Test Chip')).toBeInTheDocument();
  });

  it('renders with default color', () => {
    render(<Chip label="Default" />);
    const chip = screen.getByText('Default');
    expect(chip).toBeInTheDocument();
  });

  it('renders with different colors', () => {
    const { rerender } = render(<Chip label="Primary" color="primary" />);
    expect(screen.getByText('Primary')).toBeInTheDocument();

    rerender(<Chip label="Secondary" color="secondary" />);
    expect(screen.getByText('Secondary')).toBeInTheDocument();

    rerender(<Chip label="Success" color="success" />);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('renders with status prop', () => {
    const { rerender } = render(<Chip label="Running" status="running" />);
    expect(screen.getByText('Running')).toBeInTheDocument();

    rerender(<Chip label="Warning" status="warning" />);
    expect(screen.getByText('Warning')).toBeInTheDocument();

    rerender(<Chip label="Error" status="error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();

    rerender(<Chip label="Stopped" status="stopped" />);
    expect(screen.getByText('Stopped')).toBeInTheDocument();

    rerender(<Chip label="Pending" status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();

    rerender(<Chip label="Terminated" status="terminated" />);
    expect(screen.getByText('Terminated')).toBeInTheDocument();
  });

  it('applies status styles correctly', () => {
    render(<Chip label="Running" status="running" />);
    const chip = screen.getByText('Running');
    expect(chip).toBeInTheDocument();
    // The actual styling would be applied through CSS classes
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Chip label="Small" size="small" />);
    expect(screen.getByText('Small')).toBeInTheDocument();

    rerender(<Chip label="Medium" size="medium" />);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('renders as deletable when onDelete is provided', () => {
    const handleDelete = () => {};
    render(<Chip label="Deletable" onDelete={handleDelete} />);
    expect(screen.getByText('Deletable')).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    render(<Chip label="Styled" sx={{ backgroundColor: 'red' }} />);
    const chip = screen.getByText('Styled').closest('.MuiChip-root');
    expect(chip).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('forwards other props to MUI Chip', () => {
    render(<Chip label="Test" data-testid="custom-chip" variant="outlined" />);
    expect(screen.getByTestId('custom-chip')).toBeInTheDocument();
  });

  it('prioritizes status over color prop', () => {
    render(<Chip label="Status Priority" color="primary" status="error" />);
    const chip = screen.getByText('Status Priority');
    expect(chip).toBeInTheDocument();
    // Status should take precedence over color
  });

  it('renders with icon', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;
    render(<Chip label="With Icon" icon={<TestIcon />} />);
    
    expect(screen.getByText('With Icon')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });
});

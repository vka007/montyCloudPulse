import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress } from './Progress';

describe('Progress Component', () => {
  describe('Linear Progress', () => {
    it('renders linear progress with default props', () => {
      render(<Progress type="linear" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders linear progress with value', () => {
      render(<Progress type="linear" value={50} variant="determinate" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
    });

    it('shows value when showValue is true', () => {
      render(<Progress type="linear" value={75} showValue />);
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('shows label when provided', () => {
      render(<Progress type="linear" label="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<Progress type="linear" size="small" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      rerender(<Progress type="linear" size="medium" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      rerender(<Progress type="linear" size="large" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders with different colors', () => {
      const { rerender } = render(<Progress type="linear" color="primary" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      rerender(<Progress type="linear" color="success" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      rerender(<Progress type="linear" color="warning" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      rerender(<Progress type="linear" color="error" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders indeterminate variant', () => {
      render(<Progress type="linear" variant="indeterminate" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders determinate variant with value', () => {
      render(<Progress type="linear" variant="determinate" value={60} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Circular Progress', () => {
    it('renders circular progress with default props', () => {
      render(<Progress type="circular" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders circular progress with value', () => {
      render(<Progress type="circular" value={50} variant="determinate" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
    });

    it('shows value when showValue is true', () => {
      render(<Progress type="circular" value={75} showValue />);
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('renders with custom size', () => {
      render(<Progress type="circular" size={100} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders with custom thickness', () => {
      render(<Progress type="circular" thickness={5} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders with different colors', () => {
      const { rerender } = render(<Progress type="circular" color="primary" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      rerender(<Progress type="circular" color="success" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      rerender(<Progress type="circular" color="warning" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      rerender(<Progress type="circular" color="error" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders indeterminate variant', () => {
      render(<Progress type="circular" variant="indeterminate" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders determinate variant with value', () => {
      render(<Progress type="circular" variant="determinate" value={60} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Value Display', () => {
    it('rounds values correctly', () => {
      render(<Progress type="linear" value={75.7} showValue />);
      expect(screen.getByText('76%')).toBeInTheDocument();
    });

    it('handles undefined values gracefully', () => {
      render(<Progress type="linear" showValue />);
      // Should not crash and should not show percentage
      expect(screen.queryByText(/%/)).not.toBeInTheDocument();
    });

    it('handles zero values', () => {
      render(<Progress type="linear" value={0} showValue />);
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('handles 100% values', () => {
      render(<Progress type="linear" value={100} showValue />);
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });
});

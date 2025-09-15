import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dashboard } from './Dashboard';

// Mock the ResponsiveDashboard component
vi.mock('./components/ResponsiveDashboard/ResponsiveDashboard', () => ({
  ResponsiveDashboard: () => <div data-testid="responsive-dashboard">Responsive Dashboard</div>
}));

describe('Dashboard Page', () => {
  it('renders ResponsiveDashboard component', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('responsive-dashboard')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => render(<Dashboard />)).not.toThrow();
  });
});

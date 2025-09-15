import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Inventory } from './Inventory';

// Mock the ResourceTable component
vi.mock('./components/ResourceTable/ResourceTable', () => ({
  ResourceTable: () => <div data-testid="resource-table">Resource Table</div>
}));

describe('Inventory Page', () => {
  it('renders ResourceTable component', () => {
    render(<Inventory />);
    expect(screen.getByTestId('resource-table')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => render(<Inventory />)).not.toThrow();
  });
});

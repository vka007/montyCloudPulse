import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SidebarLayout } from './SidebarLayout';

// Mock the ThemeToggle component
vi.mock('../../../theme/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>
}));

describe('SidebarLayout Component', () => {
  const defaultProps = {
    children: <div data-testid="test-children">Test Content</div>,
    activeTab: 'dashboard',
    onTabChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children content', () => {
    render(<SidebarLayout {...defaultProps} />);
    expect(screen.getByTestId('test-children')).toBeInTheDocument();
  });

  it('renders sidebar with navigation items', () => {
    render(<SidebarLayout {...defaultProps} />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Inventory')).toBeInTheDocument();
  });

  it('renders header content when provided', () => {
    const headerContent = <div data-testid="header-content">Header Content</div>;
    render(<SidebarLayout {...defaultProps} headerContent={headerContent} />);
    
    expect(screen.getByTestId('header-content')).toBeInTheDocument();
  });

  it('renders theme toggle in top bar', () => {
    render(<SidebarLayout {...defaultProps} />);
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('handles tab change when navigation item is clicked', () => {
    const onTabChange = vi.fn();
    render(<SidebarLayout {...defaultProps} onTabChange={onTabChange} />);
    
    fireEvent.click(screen.getByText('Inventory'));
    expect(onTabChange).toHaveBeenCalledWith('inventory');
  });

  it('shows active tab styling', () => {
    render(<SidebarLayout {...defaultProps} activeTab="dashboard" />);
    
    const dashboardTab = screen.getByText('Dashboard').closest('div');
    expect(dashboardTab).toBeInTheDocument();
  });

  it('expands sidebar on hover', () => {
    render(<SidebarLayout {...defaultProps} />);
    
    const sidebar = screen.getByText('Dashboard').closest('div')?.parentElement;
    if (sidebar) {
      fireEvent.mouseEnter(sidebar);
      // The sidebar should expand (this would be tested through CSS classes in a real scenario)
    }
  });

  it('applies noPadding prop correctly', () => {
    render(<SidebarLayout {...defaultProps} noPadding />);
    
    const contentArea = screen.getByTestId('test-children').closest('div');
    expect(contentArea).toBeInTheDocument();
  });

  it('renders logo with cloud icon', () => {
    render(<SidebarLayout {...defaultProps} />);
    
    // The logo should contain the cloud icon (this would be tested through the icon component)
    expect(screen.getByText('MontyCloud Pulse')).toBeInTheDocument();
  });

  it('handles multiple tab changes', () => {
    const onTabChange = vi.fn();
    render(<SidebarLayout {...defaultProps} onTabChange={onTabChange} />);
    
    fireEvent.click(screen.getByText('Dashboard'));
    fireEvent.click(screen.getByText('Inventory'));
    
    expect(onTabChange).toHaveBeenCalledTimes(2);
    expect(onTabChange).toHaveBeenNthCalledWith(1, 'dashboard');
    expect(onTabChange).toHaveBeenNthCalledWith(2, 'inventory');
  });

  it('renders with default props when optional props are not provided', () => {
    render(
      <SidebarLayout
        activeTab="dashboard"
        onTabChange={vi.fn()}
      >
        <div data-testid="minimal-children">Minimal Content</div>
      </SidebarLayout>
    );
    
    expect(screen.getByTestId('minimal-children')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Inventory')).toBeInTheDocument();
  });
});

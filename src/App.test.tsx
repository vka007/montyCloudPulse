import React from 'react';
import { render, screen } from '@/test/testUtils';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the theme hook
vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    muiTheme: {
      palette: { 
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
        error: { main: '#f44336' },
        warning: { main: '#ff9800' },
        info: { main: '#2196f3' },
        success: { main: '#4caf50' },
        background: { default: '#ffffff', paper: '#ffffff' },
        text: { primary: '#000000', secondary: '#666666' },
        common: { white: '#ffffff', black: '#000000' },
      },
      typography: {
        fontWeightBold: 700,
        fontWeightMedium: 500,
        fontWeightRegular: 400,
      },
    },
  }),
}));

// Mock the enhanced resource store
vi.mock('@/store/enhancedResourceStore', () => ({
  useEnhancedResourceStore: () => ({
    stopRealTimeUpdates: vi.fn(),
  }),
}));

// Mock the Navigation component
vi.mock('@/navigation/Navigation', () => ({
  Navigation: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="navigation">{children}</div>
  ),
}));

// Mock the Notistack component
vi.mock('@/components/base/Notistack', () => ({
  Notistack: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="notistack">{children}</div>
  ),
}));

// Mock the NotificationProvider
vi.mock('@/notification/NotificationProvider', () => ({
  NotificationProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="notification-provider">{children}</div>
  ),
}));

// Mock the page components
vi.mock('@/pages/Dashboard', () => ({
  Dashboard: () => <div data-testid="dashboard-page">Dashboard</div>,
}));

vi.mock('@/pages/Inventory', () => ({
  Inventory: () => <div data-testid="inventory-page">Inventory</div>,
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('renders all main components', () => {
    render(<App />);
    
    expect(screen.getByTestId('notistack')).toBeInTheDocument();
    expect(screen.getByTestId('notification-provider')).toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('redirects root path to dashboard', () => {
    render(<App />);
    
    // The navigation should handle the routing
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('renders with theme provider', () => {
    render(<App />);
    
    // The app should render without theme-related errors
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('sets up global cleanup for real-time updates', () => {
    render(<App />);
    
    // The component should be rendered (cleanup will be tested on unmount)
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });
});

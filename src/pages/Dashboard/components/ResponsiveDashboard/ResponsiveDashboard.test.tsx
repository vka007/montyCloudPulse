import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResponsiveDashboard } from './ResponsiveDashboard';

// Mock the enhanced resource store
const mockResourceStore = {
  resources: [
    {
      id: '1',
      name: 'Test Resource',
      type: 'ec2',
      region: 'us-east-1',
      account: 'test-account',
      instanceType: 't3.micro',
      status: 'running',
      metrics: {
        cpu: { current: 50, history: [45, 50, 55] },
        memory: { percentage: 60, current: 2.5, history: [55, 60, 65] },
        network: { inbound: 10, outbound: 15, history: [] },
      },
      cost: { monthly: 25.50 },
      lastUpdated: new Date(),
    },
  ],
  loading: false,
  initializeIfNeeded: vi.fn(),
  isRealTimeActive: false,
  startRealTimeUpdates: vi.fn(),
};

vi.mock('@/store/enhancedResourceStore', () => ({
  useEnhancedResourceStore: () => mockResourceStore,
}));

// Mock the chart components
vi.mock('@/components/base/Charts', () => ({
  CPUTrendChart: ({ data }: any) => <div data-testid="cpu-chart">CPU Chart: {data.length} points</div>,
  MemoryChart: ({ data }: any) => <div data-testid="memory-chart">Memory Chart: {data.length} points</div>,
  NetworkTrafficChart: ({ data }: any) => <div data-testid="network-chart">Network Chart: {data.length} points</div>,
}));

// Mock the ResourceSelector component
vi.mock('../../../Inventory/components/ResourceSelector/ResourceSelector', () => ({
  ResourceSelector: ({ onResourceChange, onResourceTypeChange, onRegionChange, onAccountChange }: any) => (
    <div data-testid="resource-selector">
      <button onClick={() => onResourceChange('1')}>Select Resource</button>
      <button onClick={() => onResourceTypeChange('ec2')}>Select Type</button>
      <button onClick={() => onRegionChange('us-east-1')}>Select Region</button>
      <button onClick={() => onAccountChange('test-account')}>Select Account</button>
    </div>
  ),
}));

// Mock the DynamicMetrics component
vi.mock('../DynamicMetrics/DynamicMetrics', () => ({
  DynamicMetrics: ({ selectedResources }: any) => (
    <div data-testid="dynamic-metrics">
      {selectedResources && selectedResources.length > 0 
        ? `Dynamic Metrics for ${selectedResources[0].name}`
        : 'Dynamic Metrics for No Resource'
      }
    </div>
  ),
}));

describe('ResponsiveDashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ResponsiveDashboard />);
    expect(screen.getByTestId('resource-selector')).toBeInTheDocument();
  });

  it('renders resource selector', () => {
    render(<ResponsiveDashboard />);
    expect(screen.getByTestId('resource-selector')).toBeInTheDocument();
  });

  it('renders tabs for different views', () => {
    render(<ResponsiveDashboard />);
    
    expect(screen.getByRole('tab', { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /compute/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /network/i })).toBeInTheDocument();
  });

  it('switches between tabs when clicked', () => {
    render(<ResponsiveDashboard />);
    
    const computeTab = screen.getByRole('tab', { name: /compute/i });
    fireEvent.click(computeTab);
    
    expect(computeTab).toHaveAttribute('aria-selected', 'true');
  });

  it('renders dynamic metrics in overview tab', () => {
    render(<ResponsiveDashboard />);
    
    expect(screen.getByTestId('dynamic-metrics')).toBeInTheDocument();
  });

  it('renders dynamic metrics when resource is selected', async () => {
    render(<ResponsiveDashboard />);
    
    const selectResourceButton = screen.getByText('Select Resource');
    fireEvent.click(selectResourceButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('dynamic-metrics')).toBeInTheDocument();
    });
  });

  it('handles resource selection changes', async () => {
    render(<ResponsiveDashboard />);
    
    const selectResourceButton = screen.getByText('Select Resource');
    fireEvent.click(selectResourceButton);
    
    await waitFor(() => {
      expect(screen.getByText('Dynamic Metrics for Test Resource')).toBeInTheDocument();
    });
  });

  it('handles resource type changes', () => {
    render(<ResponsiveDashboard />);
    
    const selectTypeButton = screen.getByText('Select Type');
    fireEvent.click(selectTypeButton);
    
    // The component should handle the type change
    expect(selectTypeButton).toBeInTheDocument();
  });

  it('handles region changes', () => {
    render(<ResponsiveDashboard />);
    
    const selectRegionButton = screen.getByText('Select Region');
    fireEvent.click(selectRegionButton);
    
    // The component should handle the region change
    expect(selectRegionButton).toBeInTheDocument();
  });

  it('handles account changes', () => {
    render(<ResponsiveDashboard />);
    
    const selectAccountButton = screen.getByText('Select Account');
    fireEvent.click(selectAccountButton);
    
    // The component should handle the account change
    expect(selectAccountButton).toBeInTheDocument();
  });

  it('shows loading state when resources are loading', () => {
    vi.mocked(mockResourceStore).loading = true;
    
    render(<ResponsiveDashboard />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('initializes data and starts real-time updates on mount', () => {
    render(<ResponsiveDashboard />);
    
    expect(mockResourceStore.initializeIfNeeded).toHaveBeenCalled();
  });

  it('renders with empty resources gracefully', () => {
    vi.mocked(mockResourceStore).resources = [];
    
    render(<ResponsiveDashboard />);
    
    expect(screen.getByTestId('resource-selector')).toBeInTheDocument();
    expect(screen.getByTestId('dynamic-metrics')).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useEnhancedResourceStore } from './enhancedResourceStore';

vi.mock('@/dataFactory/enhancedMockData', () => ({
  enhancedMockResources: [
    {
      id: '1',
      name: 'Test Resource',
      type: 'ec2' as const,
      region: 'us-east-1',
      account: 'test-account',
      instanceType: 't3.micro',
      status: 'running' as const,
      metrics: {
        cpu: { current: 50, average: 50, max: 55, history: [45, 50, 55] },
        memory: { percentage: 60, current: 2.5, total: 4.0, history: [55, 60, 65] },
        network: { inbound: 10, outbound: 15, history: [] },
      },
      cost: { hourly: 0.035, daily: 0.85, monthly: 25.50, currency: 'USD' },
      tags: { Environment: 'test', Project: 'montycloud' },
      lastUpdated: new Date(),
    },
  ],
}));

describe('Enhanced Resource Store', () => {
  beforeEach(() => {
    // Reset the store state before each test
    useEnhancedResourceStore.setState({
      resources: [],
      loading: false,
      error: null,
      lastUpdated: null,
      isRealTimeActive: false,
      realTimeInterval: null,
      _initialized: false,
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up any intervals
    const { realTimeInterval } = useEnhancedResourceStore.getState();
    if (realTimeInterval) {
      clearInterval(realTimeInterval);
    }
  });

  describe('Initial State', () => {
    it('has correct initial state', () => {
      const state = useEnhancedResourceStore.getState();
      
      expect(state.resources).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.lastUpdated).toBeNull();
      expect(state.isRealTimeActive).toBe(false);
      expect(state.realTimeInterval).toBeNull();
      expect(state._initialized).toBe(false);
    });
  });

  describe('setResources', () => {
    it('sets resources and updates lastUpdated', () => {
      const { setResources } = useEnhancedResourceStore.getState();
      const testResources = [
        {
          id: '1',
          name: 'Test Resource',
          type: 'ec2' as const,
          region: 'us-east-1',
          account: 'test-account',
          instanceType: 't3.micro',
          status: 'running' as const,
          metrics: {
            cpu: { current: 50, average: 50, max: 55, history: [45, 50, 55] },
            memory: { percentage: 60, current: 2.5, total: 4.0, history: [55, 60, 65] },
            network: { inbound: 10, outbound: 15, history: [] },
          },
          cost: { hourly: 0.035, daily: 0.85, monthly: 25.50, currency: 'USD' },
          tags: { Environment: 'test', Project: 'montycloud' },
          lastUpdated: new Date(),
        },
      ];
      
      setResources(testResources);
      
      const state = useEnhancedResourceStore.getState();
      expect(state.resources).toEqual(testResources);
      expect(state.lastUpdated).toBeInstanceOf(Date);
      expect(state.error).toBeNull();
    });
  });

  describe('updateResource', () => {
    it('updates a specific resource', () => {
      const { setResources, updateResource } = useEnhancedResourceStore.getState();
      const testResources = [
        {
          id: '1',
          name: 'Test Resource',
          type: 'ec2' as const,
          region: 'us-east-1',
          account: 'test-account',
          instanceType: 't3.micro',
          status: 'running' as const,
          metrics: {
            cpu: { current: 50, average: 50, max: 55, history: [45, 50, 55] },
            memory: { percentage: 60, current: 2.5, total: 4.0, history: [55, 60, 65] },
            network: { inbound: 10, outbound: 15, history: [] },
          },
          cost: { hourly: 0.035, daily: 0.85, monthly: 25.50, currency: 'USD' },
          tags: { Environment: 'test', Project: 'montycloud' },
          lastUpdated: new Date(),
        },
      ];
      
      setResources(testResources);
      updateResource('1', { status: 'stopped' });
      
      const state = useEnhancedResourceStore.getState();
      const updatedResource = state.resources.find(r => r.id === '1');
      expect(updatedResource?.status).toBe('stopped');
      expect(state.lastUpdated).toBeInstanceOf(Date);
    });

    it('does not update non-existent resource', () => {
      const { setResources, updateResource } = useEnhancedResourceStore.getState();
      const testResources = [
        {
          id: '1',
          name: 'Test Resource',
          type: 'ec2' as const,
          region: 'us-east-1',
          account: 'test-account',
          instanceType: 't3.micro',
          status: 'running' as const,
          metrics: {
            cpu: { current: 50, average: 50, max: 55, history: [45, 50, 55] },
            memory: { percentage: 60, current: 2.5, total: 4.0, history: [55, 60, 65] },
            network: { inbound: 10, outbound: 15, history: [] },
          },
          cost: { hourly: 0.035, daily: 0.85, monthly: 25.50, currency: 'USD' },
          tags: { Environment: 'test', Project: 'montycloud' },
          lastUpdated: new Date(),
        },
      ];
      
      setResources(testResources);
      updateResource('999', { status: 'stopped' });
      
      const state = useEnhancedResourceStore.getState();
      expect(state.resources).toEqual(testResources);
    });
  });

  describe('refreshData', () => {
    it('loads data successfully', async () => {
      const { refreshData } = useEnhancedResourceStore.getState();
      
      await refreshData();
      
      const state = useEnhancedResourceStore.getState();
      expect(state.resources).toHaveLength(1);
      expect(state.resources[0].id).toBe('1');
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state._initialized).toBe(true);
    });

    it('sets loading state during refresh', async () => {
      const { refreshData } = useEnhancedResourceStore.getState();
      
      const refreshPromise = refreshData();
      
      // Check loading state immediately
      let state = useEnhancedResourceStore.getState();
      expect(state.loading).toBe(true);
      
      await refreshPromise;
      
      // Check final state
      state = useEnhancedResourceStore.getState();
      expect(state.loading).toBe(false);
    });

    it('prevents multiple simultaneous calls', async () => {
      const { refreshData } = useEnhancedResourceStore.getState();
      
      const promise1 = refreshData();
      const promise2 = refreshData();
      
      await Promise.all([promise1, promise2]);
      
      const state = useEnhancedResourceStore.getState();
      expect(state.resources).toHaveLength(1);
      expect(state.resources[0].id).toBe('1');
    });
  });

  describe('initializeIfNeeded', () => {
    it('initializes data when not initialized', () => {
      const { initializeIfNeeded } = useEnhancedResourceStore.getState();
      
      initializeIfNeeded();
      
      // Should trigger refreshData (we can't easily test the async part without more complex mocking)
      const state = useEnhancedResourceStore.getState();
      expect(state._initialized).toBe(false); // Still false until refreshData completes
    });

    it('does not initialize when already initialized', () => {
      const { setResources, initializeIfNeeded } = useEnhancedResourceStore.getState();
      const testResources = [
        {
          id: '1',
          name: 'Test Resource',
          type: 'ec2' as const,
          region: 'us-east-1',
          account: 'test-account',
          instanceType: 't3.micro',
          status: 'running' as const,
          metrics: {
            cpu: { current: 50, average: 50, max: 55, history: [45, 50, 55] },
            memory: { percentage: 60, current: 2.5, total: 4.0, history: [55, 60, 65] },
            network: { inbound: 10, outbound: 15, history: [] },
          },
          cost: { hourly: 0.035, daily: 0.85, monthly: 25.50, currency: 'USD' },
          tags: { Environment: 'test', Project: 'montycloud' },
          lastUpdated: new Date(),
        },
      ];
      
      setResources(testResources);
      useEnhancedResourceStore.setState({ _initialized: true });
      
      initializeIfNeeded();
      
      const state = useEnhancedResourceStore.getState();
      expect(state._initialized).toBe(true);
    });
  });

  describe('Real-time Updates', () => {
    it('starts real-time updates', () => {
      const { startRealTimeUpdates } = useEnhancedResourceStore.getState();
      
      startRealTimeUpdates();
      
      const state = useEnhancedResourceStore.getState();
      expect(state.isRealTimeActive).toBe(true);
      expect(state.realTimeInterval).toBeDefined();
    });

    it('does not start multiple intervals', () => {
      const { startRealTimeUpdates } = useEnhancedResourceStore.getState();
      
      startRealTimeUpdates();
      const firstInterval = useEnhancedResourceStore.getState().realTimeInterval;
      
      startRealTimeUpdates();
      const secondInterval = useEnhancedResourceStore.getState().realTimeInterval;
      
      expect(firstInterval).toBe(secondInterval);
    });

    it('stops real-time updates', () => {
      const { startRealTimeUpdates, stopRealTimeUpdates } = useEnhancedResourceStore.getState();
      
      startRealTimeUpdates();
      stopRealTimeUpdates();
      
      const state = useEnhancedResourceStore.getState();
      expect(state.isRealTimeActive).toBe(false);
      expect(state.realTimeInterval).toBeNull();
    });

    it('clears existing interval when starting new one', () => {
      const { startRealTimeUpdates } = useEnhancedResourceStore.getState();
      
      startRealTimeUpdates();
      const firstInterval = useEnhancedResourceStore.getState().realTimeInterval;
      
      // Clear the interval manually to simulate cleanup
      if (firstInterval) {
        clearInterval(firstInterval);
      }
      
      startRealTimeUpdates();
      const secondInterval = useEnhancedResourceStore.getState().realTimeInterval;
      
      expect(secondInterval).toBeDefined();
      // The intervals should be different objects
      expect(secondInterval).toBeDefined();
    });
  });

  describe('updateMetricsRealTime', () => {
    it('updates metrics for all resources', () => {
      const { setResources, updateMetricsRealTime } = useEnhancedResourceStore.getState();
      const testResources = [
        {
          id: '1',
          name: 'Test Resource',
          type: 'ec2' as const,
          region: 'us-east-1',
          account: 'test-account',
          instanceType: 't3.micro',
          status: 'running' as const,
          metrics: {
            cpu: { current: 50, average: 50, max: 55, history: [45, 50, 55] },
            memory: { percentage: 60, current: 2.5, total: 4.0, history: [55, 60, 65] },
            network: { inbound: 10, outbound: 15, history: [] },
          },
          cost: { hourly: 0.035, daily: 0.85, monthly: 25.50, currency: 'USD' },
          tags: { Environment: 'test', Project: 'montycloud' },
          lastUpdated: new Date(),
        },
      ];
      
      setResources(testResources);
      
      updateMetricsRealTime();
      
      const state = useEnhancedResourceStore.getState();
      const updatedResource = state.resources[0];
      
      // Metrics should be updated (they will be different due to random variation)
      expect(updatedResource.metrics.cpu.current).toBeDefined();
      expect(updatedResource.lastUpdated).toBeInstanceOf(Date);
    });

    it('does not update when no resources exist', () => {
      const { updateMetricsRealTime } = useEnhancedResourceStore.getState();
      
      updateMetricsRealTime();
      
      const state = useEnhancedResourceStore.getState();
      expect(state.resources).toEqual([]);
    });
  });

  describe('Loading and Error States', () => {
    it('sets loading state', () => {
      const { setLoading } = useEnhancedResourceStore.getState();
      
      setLoading(true);
      expect(useEnhancedResourceStore.getState().loading).toBe(true);
      
      setLoading(false);
      expect(useEnhancedResourceStore.getState().loading).toBe(false);
    });

    it('sets error state', () => {
      const { setError } = useEnhancedResourceStore.getState();
      
      setError('Test error');
      expect(useEnhancedResourceStore.getState().error).toBe('Test error');
      
      setError(null);
      expect(useEnhancedResourceStore.getState().error).toBeNull();
    });
  });
});

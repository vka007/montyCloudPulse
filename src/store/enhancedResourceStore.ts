import { create } from 'zustand';
import { EnhancedResource, enhancedMockResources } from '@/dataFactory/enhancedMockData';

interface EnhancedResourceStore {
  // State
  resources: EnhancedResource[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isRealTimeActive: boolean;
  realTimeInterval: number | null;
  _initialized: boolean;

  // Actions
  setResources: (resources: EnhancedResource[]) => void;
  updateResource: (id: string, updates: Partial<EnhancedResource>) => void;
  refreshData: () => Promise<void>;
  initializeIfNeeded: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  startRealTimeUpdates: () => void;
  stopRealTimeUpdates: () => void;
  updateMetricsRealTime: () => void;
}

// Helper function to simulate metric updates
const updateResourceMetrics = (resource: EnhancedResource): EnhancedResource => {
  const now = new Date();
  
  return {
    ...resource,
    metrics: {
      ...resource.metrics,
      cpu: {
        ...resource.metrics.cpu,
        current: Math.round(Math.max(0, Math.min(100, 
          resource.metrics.cpu.current + (Math.random() - 0.5) * 10
        )) * 10) / 10,
        history: [
          ...resource.metrics.cpu.history.slice(1),
          Math.round(Math.max(0, Math.min(100, 
            resource.metrics.cpu.current + (Math.random() - 0.5) * 15
          )) * 10) / 10
        ],
      },
      memory: {
        ...resource.metrics.memory,
        percentage: Math.round(Math.max(0, Math.min(100,
          resource.metrics.memory.percentage + (Math.random() - 0.5) * 8
        )) * 10) / 10,
        current: Math.round(Math.max(0, 
          resource.metrics.memory.current + (Math.random() - 0.5) * 0.5
        ) * 10) / 10,
        history: [
          ...resource.metrics.memory.history.slice(1),
          Math.round(Math.max(0, Math.min(100,
            resource.metrics.memory.percentage + (Math.random() - 0.5) * 12
          )) * 10) / 10
        ],
      },
      network: {
        ...resource.metrics.network,
        inbound: Math.round(Math.max(0, 
          resource.metrics.network.inbound + (Math.random() - 0.5) * 20
        ) * 10) / 10,
        outbound: Math.round(Math.max(0,
          resource.metrics.network.outbound + (Math.random() - 0.5) * 15
        ) * 10) / 10,
        history: [
          ...resource.metrics.network.history.slice(1),
          {
            time: now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
            inbound: Math.round(Math.max(0, 
              resource.metrics.network.inbound + (Math.random() - 0.5) * 30
            ) * 10) / 10,
            outbound: Math.round(Math.max(0,
              resource.metrics.network.outbound + (Math.random() - 0.5) * 25
            ) * 10) / 10,
          }
        ],
      },
    },
    lastUpdated: now,
  };
};

export const useEnhancedResourceStore = create<EnhancedResourceStore>((set, get) => ({
  // Initial state
  resources: [],
  loading: false,
  error: null,
  lastUpdated: null,
  isRealTimeActive: false,
  realTimeInterval: null,
  _initialized: false,

  // Actions
  setResources: (resources: EnhancedResource[]) => {
    set({
      resources,
      lastUpdated: new Date(),
      error: null,
    });
  },

  updateResource: (id: string, updates: Partial<EnhancedResource>) => {
    const { resources } = get();
    const updatedResources = resources.map(resource =>
      resource.id === id
        ? { ...resource, ...updates, lastUpdated: new Date() }
        : resource
    );
    
    set({
      resources: updatedResources,
      lastUpdated: new Date(),
    });
  },

  refreshData: async () => {
    const state = get();
    if (state.loading) return; // Prevent multiple simultaneous calls
    
    set({ loading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Use enhanced mock data with updated timestamps
      const resources = enhancedMockResources.map(resource => ({
        ...resource,
        lastUpdated: new Date(),
      }));
      
      set({
        resources,
        lastUpdated: new Date(),
        error: null,
        loading: false,
        _initialized: true,
      });
    } catch (error) {
      set({ error: 'Failed to fetch resources', loading: false });
    }
  },

  // Auto-initialize data when store is first accessed
  initializeIfNeeded: () => {
    const state = get();
    if (!state._initialized && !state.loading && state.resources.length === 0) {
      get().refreshData();
    }
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  startRealTimeUpdates: () => {
    const { isRealTimeActive, realTimeInterval } = get();
    
    if (isRealTimeActive || realTimeInterval) {
      return; // Already active
    }

    // Start with initial data if not loaded
    if (get().resources.length === 0) {
      get().refreshData();
    }

    const interval = setInterval(() => {
      get().updateMetricsRealTime();
    }, 2000); // Update every 2 seconds for more dynamic feel

    set({ 
      isRealTimeActive: true, 
      realTimeInterval: interval 
    });
  },

  stopRealTimeUpdates: () => {
    const { realTimeInterval } = get();
    
    if (realTimeInterval) {
      clearInterval(realTimeInterval);
    }

    set({ 
      isRealTimeActive: false, 
      realTimeInterval: null 
    });
  },

  updateMetricsRealTime: () => {
    const { resources } = get();
    
    if (resources.length === 0) {
      return;
    }

    // Update metrics for all resources with realistic variations
    const updatedResources = resources.map(resource => updateResourceMetrics(resource));

    set({
      resources: updatedResources,
      lastUpdated: new Date(),
    });
  },
}));

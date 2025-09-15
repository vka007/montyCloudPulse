import { create } from 'zustand';
import { CloudResource, DashboardMetrics } from '@/types/resources';
import { mockResources, calculateDashboardMetrics } from '@/dataFactory/mockResources';
import { updateResourceMetrics } from '@/dataFactory/dataGenerator';

interface ResourceStore {
  // State
  resources: CloudResource[];
  dashboardMetrics: DashboardMetrics;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isRealTimeActive: boolean;
  realTimeInterval: number | null;

  // Actions
  setResources: (resources: CloudResource[]) => void;
  updateResource: (id: string, updates: Partial<CloudResource>) => void;
  refreshData: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  startRealTimeUpdates: () => void;
  stopRealTimeUpdates: () => void;
  updateMetricsRealTime: () => void;
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
  // Initial state
  resources: [],
  dashboardMetrics: {
    totalResources: 0,
    runningResources: 0,
    stoppedResources: 0,
    warningResources: 0,
    errorResources: 0,
    pendingResources: 0,
    terminatedResources: 0,
    resourcesByType: {
      ec2: 0,
      rds: 0,
      lambda: 0,
      s3: 0,
      loadbalancer: 0,
      cloudfront: 0,
      apigateway: 0,
      ecs: 0,
    },
    resourcesByRegion: {
      'us-east-1': 0,
      'us-west-2': 0,
      'eu-west-1': 0,
      'ap-south-1': 0,
      'eu-central-1': 0,
      'ap-northeast-1': 0,
    },
    totalCpuUsage: 0,
    totalMemoryUsage: 0,
    totalNetworkTraffic: 0,
    totalRequests: 0,
    averageLatency: 0,
    errorRate: 0,
  },
  loading: false,
  error: null,
  lastUpdated: null,
  isRealTimeActive: false,
  realTimeInterval: null,

  // Actions
  setResources: (resources: CloudResource[]) => {
    const dashboardMetrics = calculateDashboardMetrics(resources);
    set({
      resources,
      dashboardMetrics,
      lastUpdated: new Date(),
      error: null,
    });
  },

  updateResource: (id: string, updates: Partial<CloudResource>) => {
    const { resources } = get();
    const updatedResources = resources.map(resource =>
      resource.id === id
        ? { ...resource, ...updates, lastUpdated: new Date() }
        : resource
    );
    
    const dashboardMetrics = calculateDashboardMetrics(updatedResources);
    set({
      resources: updatedResources,
      dashboardMetrics,
      lastUpdated: new Date(),
    });
  },

  refreshData: async () => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      const resources = mockResources.map(resource => ({
        ...resource,
        lastUpdated: new Date(),
      }));
      
      get().setResources(resources);
    } catch (error) {
      set({ error: 'Failed to fetch resources' });
    } finally {
      set({ loading: false });
    }
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  startRealTimeUpdates: () => {
    const { isRealTimeActive, realTimeInterval } = get();
    
    if (isRealTimeActive || realTimeInterval) {
      return; // Already active
    }

    const interval = setInterval(() => {
      get().updateMetricsRealTime();
    }, 3000); // Update every 3 seconds

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

    // Update metrics for all resources
    const updatedResources = resources.map(resource => ({
      ...resource,
      metrics: updateResourceMetrics(resource.metrics, resource.type),
      lastUpdated: new Date(),
    }));

    // Calculate new dashboard metrics
    const dashboardMetrics = calculateDashboardMetrics(updatedResources);

    set({
      resources: updatedResources,
      dashboardMetrics,
      lastUpdated: new Date(),
    });
  },
}));

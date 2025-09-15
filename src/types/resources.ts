// Resource types for cloud monitoring dashboard

export type ResourceType = 'ec2' | 'rds' | 'lambda' | 's3' | 'loadbalancer' | 'cloudfront' | 'apigateway' | 'ecs';
export type ResourceStatus = 'running' | 'stopped' | 'warning' | 'error' | 'pending' | 'terminated';
export type Region = 'us-east-1' | 'us-west-2' | 'eu-west-1' | 'ap-south-1' | 'eu-central-1' | 'ap-northeast-1';
export type AlertLevel = 'info' | 'warning' | 'critical';

export interface MetricHistory {
  timestamp: Date;
  value: number;
}

export interface ResourceMetrics {
  cpu: {
    current: number;
    average: number;
    peak: number;
    history: MetricHistory[];
    threshold: {
      warning: number;
      critical: number;
    };
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
    available: number;
    history: MetricHistory[];
    threshold: {
      warning: number;
      critical: number;
    };
  };
  network: {
    inbound: number;
    outbound: number;
    packetsIn: number;
    packetsOut: number;
    history: {
      inbound: MetricHistory[];
      outbound: MetricHistory[];
    };
  };
  storage?: {
    used: number;
    total: number;
    percentage: number;
    available: number;
    iops: number;
    history: MetricHistory[];
  };
  requests?: {
    current: number;
    total: number;
    errors: number;
    latency: number;
    history: MetricHistory[];
  };
  connections?: {
    active: number;
    total: number;
    failed: number;
  };
}

export interface CloudResource {
  id: string;
  name: string;
  type: ResourceType;
  status: ResourceStatus;
  region: Region;
  account: string;
  metrics: ResourceMetrics;
  tags: Record<string, string>;
  createdAt: Date;
  lastUpdated: Date;
}

export interface DashboardMetrics {
  totalResources: number;
  runningResources: number;
  stoppedResources: number;
  warningResources: number;
  errorResources: number;
  pendingResources: number;
  terminatedResources: number;
  resourcesByType: Record<ResourceType, number>;
  resourcesByRegion: Record<Region, number>;
  totalCpuUsage: number;
  totalMemoryUsage: number;
  totalNetworkTraffic: number;
  totalRequests: number;
  averageLatency: number;
  errorRate: number;
}

export interface MetricCardData {
  title: string;
  value: number | string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  icon?: string;
  unit?: string;
  sparklineData?: number[];
  threshold?: {
    warning: number;
    critical: number;
  };
  additionalInfo?: {
    label: string;
    value: string | number;
  }[];
  isLive?: boolean;
  lastUpdated?: Date;
}

export interface EnhancedResource {
  id: string;
  name: string;
  type: 'ec2' | 'rds' | 'lambda' | 's3' | 'loadbalancer' | 'cloudfront' | 'apigateway' | 'ecs';
  status: 'running' | 'stopped' | 'warning' | 'error' | 'pending' | 'terminated';
  region: string;
  account: string;
  instanceType?: string;
  cost: {
    hourly: number;
    daily: number;
    monthly: number;
    currency: string;
  };
  metrics: {
    cpu: {
      current: number;
      average: number;
      max: number;
      history: number[];
    };
    memory: {
      current: number;
      percentage: number;
      total: number;
      history: number[];
    };
    network: {
      inbound: number;
      outbound: number;
      history: Array<{ time: string; inbound: number; outbound: number }>;
    };
    storage?: {
      used: number;
      total: number;
      iops: number;
    };
  };
  tags: Record<string, string>;
  lastUpdated: Date;
}

export const enhancedMockResources: EnhancedResource[] = [
  // EC2 Instances
  {
    id: 'i-1234567890abcdef0',
    name: 'web-server-prod-01',
    type: 'ec2',
    status: 'running',
    region: 'us-east-1',
    account: 'prod-account',
    instanceType: 't3.large',
    cost: {
      hourly: 0.0832,
      daily: 1.997,
      monthly: 59.904,
      currency: 'USD',
    },
    metrics: {
      cpu: {
        current: 45,
        average: 38,
        max: 78,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 30 + 30 + Math.sin(i * 0.5) * 15) * 10) / 10),
      },
      memory: {
        current: 6.2,
        percentage: 78,
        total: 8,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 20 + 60 + Math.cos(i * 0.3) * 10) * 10) / 10),
      },
      network: {
        inbound: 125.5,
        outbound: 89.3,
        history: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          inbound: Math.round((Math.random() * 50 + 100) * 10) / 10,
          outbound: Math.round((Math.random() * 40 + 70) * 10) / 10,
        })),
      },
      storage: {
        used: 45,
        total: 100,
        iops: 1200,
      },
    },
    tags: {
      Environment: 'production',
      Team: 'frontend',
      Project: 'web-app',
    },
    lastUpdated: new Date(),
  },
  {
    id: 'i-1234567890abcdef1',
    name: 'api-server-prod-01',
    type: 'ec2',
    status: 'running',
    region: 'us-east-1',
    account: 'prod-account',
    instanceType: 'm5.xlarge',
    cost: {
      hourly: 0.192,
      daily: 4.608,
      monthly: 138.24,
      currency: 'USD',
    },
    metrics: {
      cpu: {
        current: 62,
        average: 55,
        max: 89,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 25 + 45 + Math.sin(i * 0.4) * 20) * 10) / 10),
      },
      memory: {
        current: 12.8,
        percentage: 64,
        total: 20,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 15 + 55 + Math.cos(i * 0.2) * 12) * 10) / 10),
      },
      network: {
        inbound: 245.7,
        outbound: 189.4,
        history: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          inbound: Math.round((Math.random() * 80 + 200) * 10) / 10,
          outbound: Math.round((Math.random() * 60 + 150) * 10) / 10,
        })),
      },
      storage: {
        used: 78,
        total: 200,
        iops: 2400,
      },
    },
    tags: {
      Environment: 'production',
      Team: 'backend',
      Project: 'api-service',
    },
    lastUpdated: new Date(),
  },
  {
    id: 'i-1234567890abcdef2',
    name: 'worker-dev-01',
    type: 'ec2',
    status: 'running',
    region: 'us-west-2',
    account: 'dev-account',
    instanceType: 't3.medium',
    cost: {
      hourly: 0.0416,
      daily: 0.998,
      monthly: 29.952,
      currency: 'USD',
    },
    metrics: {
      cpu: {
        current: 23,
        average: 28,
        max: 45,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 20 + 20 + Math.sin(i * 0.6) * 10) * 10) / 10),
      },
      memory: {
        current: 2.1,
        percentage: 52,
        total: 4,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 15 + 45 + Math.cos(i * 0.4) * 8) * 10) / 10),
      },
      network: {
        inbound: 45.2,
        outbound: 32.1,
        history: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          inbound: Math.round((Math.random() * 30 + 30) * 10) / 10,
          outbound: Math.round((Math.random() * 25 + 20) * 10) / 10,
        })),
      },
      storage: {
        used: 12,
        total: 50,
        iops: 600,
      },
    },
    tags: {
      Environment: 'development',
      Team: 'data',
      Project: 'analytics',
    },
    lastUpdated: new Date(),
  },
  // RDS Instances
  {
    id: 'db-ABCDEFGHIJKLMNOP',
    name: 'main-database-prod',
    type: 'rds',
    status: 'running',
    region: 'us-east-1',
    account: 'prod-account',
    instanceType: 'db.r5.large',
    cost: {
      hourly: 0.126,
      daily: 3.024,
      monthly: 90.72,
      currency: 'USD',
    },
    metrics: {
      cpu: {
        current: 35,
        average: 42,
        max: 67,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 20 + 35 + Math.sin(i * 0.3) * 12) * 10) / 10),
      },
      memory: {
        current: 12.5,
        percentage: 78,
        total: 16,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 10 + 70 + Math.cos(i * 0.25) * 8) * 10) / 10),
      },
      network: {
        inbound: 89.4,
        outbound: 156.7,
        history: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          inbound: Math.round((Math.random() * 40 + 70) * 10) / 10,
          outbound: Math.round((Math.random() * 50 + 130) * 10) / 10,
        })),
      },
      storage: {
        used: 450,
        total: 1000,
        iops: 3000,
      },
    },
    tags: {
      Environment: 'production',
      Team: 'backend',
      Project: 'main-app',
    },
    lastUpdated: new Date(),
  },
  // Lambda Functions
  {
    id: 'lambda-func-001',
    name: 'image-processor',
    type: 'lambda',
    status: 'running',
    region: 'us-east-1',
    account: 'prod-account',
    cost: {
      hourly: 0.0021,
      daily: 0.0504,
      monthly: 1.512,
      currency: 'USD',
    },
    metrics: {
      cpu: {
        current: 0, // Lambda doesn't show CPU in traditional sense
        average: 0,
        max: 0,
        history: [],
      },
      memory: {
        current: 256,
        percentage: 85,
        total: 256,
        history: Array.from({ length: 24 }, () => Math.round((Math.random() * 20 + 75) * 10) / 10),
      },
      network: {
        inbound: 12.3,
        outbound: 8.7,
        history: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          inbound: Math.round((Math.random() * 10 + 8) * 10) / 10,
          outbound: Math.round((Math.random() * 8 + 5) * 10) / 10,
        })),
      },
    },
    tags: {
      Environment: 'production',
      Team: 'data',
      Project: 'media-processing',
    },
    lastUpdated: new Date(),
  },
];

export const getResourcesByType = (type: string) => {
  if (type === 'all') return enhancedMockResources;
  return enhancedMockResources.filter(resource => resource.type === type);
};

export const getResourcesByRegion = (region: string) => {
  if (region === 'all') return enhancedMockResources;
  return enhancedMockResources.filter(resource => resource.region === region);
};

export const getResourcesByAccount = (account: string) => {
  if (account === 'all') return enhancedMockResources;
  return enhancedMockResources.filter(resource => resource.account === account);
};

export const getAvailableRegions = () => {
  const regions = [...new Set(enhancedMockResources.map(r => r.region))];
  return ['all', ...regions];
};

export const getAvailableAccounts = () => {
  const accounts = [...new Set(enhancedMockResources.map(r => r.account))];
  return ['all', ...accounts];
};

export const getAvailableResourceTypes = () => {
  const types = [...new Set(enhancedMockResources.map(r => r.type))];
  return ['all', ...types];
};

export const getResourceById = (id: string) => {
  return enhancedMockResources.find(resource => resource.id === id);
};

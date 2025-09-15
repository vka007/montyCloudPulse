import { additionalResources } from './additionalResources';

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
  
  // Additional EC2 Instances
  {
    id: 'i-0a1b2c3d4e5f6789a',
    name: 'web-server-prod-02',
    type: 'ec2',
    status: 'running',
    region: 'us-west-2',
    account: 'prod-account',
    instanceType: 't3.xlarge',
    cost: {
      hourly: 0.1664,
      daily: 3.994,
      monthly: 119.808,
      currency: 'USD',
    },
    metrics: {
      cpu: {
        current: 28.5,
        average: 32.1,
        max: 45.2,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 25 + 25 + Math.sin(i * 0.4) * 10) * 10) / 10),
      },
      memory: {
        current: 6.2,
        percentage: 62,
        total: 10,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 15 + 55 + Math.cos(i * 0.3) * 10) * 10) / 10),
      },
      network: {
        inbound: 45.3,
        outbound: 78.9,
        history: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          inbound: Math.round((Math.random() * 30 + 35) * 10) / 10,
          outbound: Math.round((Math.random() * 40 + 60) * 10) / 10,
        })),
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
    id: 'i-0b2c3d4e5f6789ab',
    name: 'api-gateway-dev',
    type: 'ec2',
    status: 'running',
    region: 'eu-west-1',
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
        current: 15.8,
        average: 18.3,
        max: 28.7,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 20 + 10 + Math.sin(i * 0.6) * 8) * 10) / 10),
      },
      memory: {
        current: 1.8,
        percentage: 36,
        total: 5,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 20 + 25 + Math.cos(i * 0.4) * 12) * 10) / 10),
      },
      network: {
        inbound: 12.4,
        outbound: 18.7,
        history: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          inbound: Math.round((Math.random() * 15 + 8) * 10) / 10,
          outbound: Math.round((Math.random() * 20 + 12) * 10) / 10,
        })),
      },
    },
    tags: {
      Environment: 'development',
      Team: 'backend',
      Project: 'api-services',
    },
    lastUpdated: new Date(),
  },
  {
    id: 'i-0c3d4e5f6789abc',
    name: 'cache-redis-staging',
    type: 'ec2',
    status: 'running',
    region: 'ap-southeast-1',
    account: 'staging-account',
    instanceType: 'r5.large',
    cost: {
      hourly: 0.126,
      daily: 3.024,
      monthly: 90.72,
      currency: 'USD',
    },
    metrics: {
      cpu: {
        current: 42.1,
        average: 38.7,
        max: 55.3,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 30 + 30 + Math.sin(i * 0.5) * 15) * 10) / 10),
      },
      memory: {
        current: 8.5,
        percentage: 85,
        total: 10,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 10 + 75 + Math.cos(i * 0.35) * 8) * 10) / 10),
      },
      network: {
        inbound: 25.6,
        outbound: 32.1,
        history: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          inbound: Math.round((Math.random() * 20 + 20) * 10) / 10,
          outbound: Math.round((Math.random() * 25 + 25) * 10) / 10,
        })),
      },
    },
    tags: {
      Environment: 'staging',
      Team: 'infrastructure',
      Project: 'caching',
    },
    lastUpdated: new Date(),
  },
  
  // Additional RDS Instances
  {
    id: 'db-EFGHIJKLMNOPQRST',
    name: 'analytics-db-prod',
    type: 'rds',
    status: 'running',
    region: 'us-east-2',
    account: 'prod-account',
    instanceType: 'db.r5.2xlarge',
    cost: {
      hourly: 0.69,
      daily: 16.56,
      monthly: 496.8,
      currency: 'USD',
    },
    metrics: {
      cpu: {
        current: 55.2,
        average: 48.7,
        max: 72.1,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 35 + 40 + Math.sin(i * 0.3) * 20) * 10) / 10),
      },
      memory: {
        current: 24.8,
        percentage: 78,
        total: 32,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 15 + 65 + Math.cos(i * 0.25) * 10) * 10) / 10),
      },
      network: {
        inbound: 156.7,
        outbound: 234.5,
        history: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          inbound: Math.round((Math.random() * 80 + 120) * 10) / 10,
          outbound: Math.round((Math.random() * 100 + 180) * 10) / 10,
        })),
      },
      storage: {
        used: 850,
        total: 2000,
        iops: 6000,
      },
    },
    tags: {
      Environment: 'production',
      Team: 'analytics',
      Project: 'data-warehouse',
    },
    lastUpdated: new Date(),
  },
  {
    id: 'db-GHIJKLMNOPQRSTUV',
    name: 'user-sessions-dev',
    type: 'rds',
    status: 'running',
    region: 'eu-central-1',
    account: 'dev-account',
    instanceType: 'db.t3.medium',
    cost: {
      hourly: 0.052,
      daily: 1.248,
      monthly: 37.44,
      currency: 'USD',
    },
    metrics: {
      cpu: {
        current: 22.4,
        average: 25.8,
        max: 38.9,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 20 + 20 + Math.sin(i * 0.4) * 12) * 10) / 10),
      },
      memory: {
        current: 1.8,
        percentage: 36,
        total: 5,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 15 + 25 + Math.cos(i * 0.3) * 10) * 10) / 10),
      },
      network: {
        inbound: 23.4,
        outbound: 31.7,
        history: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          inbound: Math.round((Math.random() * 15 + 15) * 10) / 10,
          outbound: Math.round((Math.random() * 20 + 20) * 10) / 10,
        })),
      },
      storage: {
        used: 120,
        total: 500,
        iops: 1000,
      },
    },
    tags: {
      Environment: 'development',
      Team: 'backend',
      Project: 'user-management',
    },
    lastUpdated: new Date(),
  },
  
  // Lambda Functions
  {
    id: 'lambda-func-002',
    name: 'email-processor',
    type: 'lambda',
    status: 'running',
    region: 'us-west-1',
    account: 'prod-account',
    cost: {
      hourly: 0.0001,
      daily: 0.0024,
      monthly: 0.072,
      currency: 'USD',
    },
    metrics: {
      cpu: {
        current: 5.2,
        average: 4.8,
        max: 12.3,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 8 + 2 + Math.sin(i * 0.8) * 4) * 10) / 10),
      },
      memory: {
        current: 0.3,
        percentage: 15,
        total: 2,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 10 + 10 + Math.cos(i * 0.6) * 5) * 10) / 10),
      },
      network: {
        inbound: 0.5,
        outbound: 1.2,
        history: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          inbound: Math.round((Math.random() * 1 + 0.2) * 10) / 10,
          outbound: Math.round((Math.random() * 2 + 0.5) * 10) / 10,
        })),
      },
    },
    tags: {
      Environment: 'production',
      Team: 'notifications',
      Project: 'email-service',
    },
    lastUpdated: new Date(),
  },
  {
    id: 'lambda-func-003',
    name: 'data-transformer',
    type: 'lambda',
    status: 'running',
    region: 'ap-northeast-1',
    account: 'staging-account',
    cost: {
      hourly: 0.0002,
      daily: 0.0048,
      monthly: 0.144,
      currency: 'USD',
    },
    metrics: {
      cpu: {
        current: 8.7,
        average: 7.2,
        max: 18.5,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 12 + 4 + Math.sin(i * 0.7) * 6) * 10) / 10),
      },
      memory: {
        current: 0.6,
        percentage: 30,
        total: 2,
        history: Array.from({ length: 24 }, (_, i) => Math.round((Math.random() * 15 + 20 + Math.cos(i * 0.5) * 8) * 10) / 10),
      },
      network: {
        inbound: 1.8,
        outbound: 2.4,
        history: Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          inbound: Math.round((Math.random() * 2 + 1) * 10) / 10,
          outbound: Math.round((Math.random() * 3 + 1.5) * 10) / 10,
        })),
      },
    },
    tags: {
      Environment: 'staging',
      Team: 'data',
      Project: 'etl-pipeline',
    },
    lastUpdated: new Date(),
  },
  
  // Add 50 additional resources
  ...additionalResources,
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

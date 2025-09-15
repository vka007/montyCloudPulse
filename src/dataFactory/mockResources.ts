import {
  CloudResource,
  ResourceType,
  DashboardMetrics,
} from '@/types/resources';
import { generateResourceMetrics } from './dataGenerator';

// Use the advanced metrics generator
const generateMetrics = (type: ResourceType) => {
  return generateResourceMetrics(type);
};

// Generate random status with weighted distribution (unused for now, but kept for future use)
// const generateStatus = (): ResourceStatus => {
//   const rand = Math.random();
//   if (rand < 0.7) return 'running';
//   if (rand < 0.85) return 'stopped';
//   if (rand < 0.95) return 'warning';
//   return 'error';
// };

// Mock resource data
export const mockResources: CloudResource[] = [
  // EC2 Instances
  {
    id: 'i-1234567890abcdef0',
    name: 'web-server-prod-01',
    type: 'ec2',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('ec2'),
    tags: { Environment: 'production', Team: 'frontend', Application: 'web' },
    createdAt: new Date('2024-01-15'),
    lastUpdated: new Date(),
  },
  {
    id: 'i-0987654321fedcba1',
    name: 'api-server-prod-02',
    type: 'ec2',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('ec2'),
    tags: { Environment: 'production', Team: 'backend', Application: 'api' },
    createdAt: new Date('2024-01-20'),
    lastUpdated: new Date(),
  },
  {
    id: 'i-abcdef1234567890',
    name: 'worker-staging-01',
    type: 'ec2',
    status: 'stopped',
    region: 'us-west-2',
    account: 'staging',
    metrics: generateMetrics('ec2'),
    tags: { Environment: 'staging', Team: 'backend', Application: 'worker' },
    createdAt: new Date('2024-02-01'),
    lastUpdated: new Date(),
  },

  // RDS Databases
  {
    id: 'db-mysql-prod-primary',
    name: 'mysql-prod-primary',
    type: 'rds',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('rds'),
    tags: { Environment: 'production', Team: 'backend', Database: 'mysql' },
    createdAt: new Date('2024-01-10'),
    lastUpdated: new Date(),
  },
  {
    id: 'db-postgres-analytics',
    name: 'postgres-analytics',
    type: 'rds',
    status: 'warning',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('rds'),
    tags: { Environment: 'production', Team: 'analytics', Database: 'postgres' },
    createdAt: new Date('2024-01-25'),
    lastUpdated: new Date(),
  },

  // Lambda Functions
  {
    id: 'lambda-auth-handler',
    name: 'auth-handler',
    type: 'lambda',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('lambda'),
    tags: { Environment: 'production', Team: 'backend', Function: 'auth' },
    createdAt: new Date('2024-02-05'),
    lastUpdated: new Date(),
  },
  {
    id: 'lambda-image-processor',
    name: 'image-processor',
    type: 'lambda',
    status: 'running',
    region: 'us-west-2',
    account: 'production',
    metrics: generateMetrics('lambda'),
    tags: { Environment: 'production', Team: 'media', Function: 'processing' },
    createdAt: new Date('2024-02-10'),
    lastUpdated: new Date(),
  },
  {
    id: 'lambda-data-sync',
    name: 'data-sync-function',
    type: 'lambda',
    status: 'error',
    region: 'eu-west-1',
    account: 'production',
    metrics: generateMetrics('lambda'),
    tags: { Environment: 'production', Team: 'data', Function: 'sync' },
    createdAt: new Date('2024-02-15'),
    lastUpdated: new Date(),
  },

  // S3 Buckets
  {
    id: 's3-static-assets-prod',
    name: 'static-assets-prod',
    type: 's3',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('s3'),
    tags: { Environment: 'production', Team: 'frontend', Purpose: 'static' },
    createdAt: new Date('2024-01-05'),
    lastUpdated: new Date(),
  },
  {
    id: 's3-user-uploads',
    name: 'user-uploads-bucket',
    type: 's3',
    status: 'running',
    region: 'us-west-2',
    account: 'production',
    metrics: generateMetrics('s3'),
    tags: { Environment: 'production', Team: 'backend', Purpose: 'uploads' },
    createdAt: new Date('2024-01-12'),
    lastUpdated: new Date(),
  },

  // Load Balancers
  {
    id: 'elb-web-prod',
    name: 'web-load-balancer',
    type: 'loadbalancer',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('loadbalancer'),
    tags: { Environment: 'production', Team: 'infrastructure', Purpose: 'web' },
    createdAt: new Date('2024-01-08'),
    lastUpdated: new Date(),
  },
  {
    id: 'elb-api-prod',
    name: 'api-load-balancer',
    type: 'loadbalancer',
    status: 'running',
    region: 'us-west-2',
    account: 'production',
    metrics: generateMetrics('loadbalancer'),
    tags: { Environment: 'production', Team: 'infrastructure', Purpose: 'api' },
    createdAt: new Date('2024-01-10'),
    lastUpdated: new Date(),
  },

  // CloudFront Distributions
  {
    id: 'cf-static-assets',
    name: 'static-assets-cdn',
    type: 'cloudfront',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('cloudfront'),
    tags: { Environment: 'production', Team: 'frontend', Purpose: 'cdn' },
    createdAt: new Date('2024-01-12'),
    lastUpdated: new Date(),
  },
  {
    id: 'cf-api-cache',
    name: 'api-cache-distribution',
    type: 'cloudfront',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('cloudfront'),
    tags: { Environment: 'production', Team: 'backend', Purpose: 'cache' },
    createdAt: new Date('2024-01-15'),
    lastUpdated: new Date(),
  },

  // API Gateway
  {
    id: 'apigw-main-api',
    name: 'main-api-gateway',
    type: 'apigateway',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('apigateway'),
    tags: { Environment: 'production', Team: 'backend', Purpose: 'api' },
    createdAt: new Date('2024-01-18'),
    lastUpdated: new Date(),
  },
  {
    id: 'apigw-webhook',
    name: 'webhook-gateway',
    type: 'apigateway',
    status: 'warning',
    region: 'us-west-2',
    account: 'production',
    metrics: generateMetrics('apigateway'),
    tags: { Environment: 'production', Team: 'integrations', Purpose: 'webhooks' },
    createdAt: new Date('2024-01-20'),
    lastUpdated: new Date(),
  },

  // ECS Services
  {
    id: 'ecs-web-service',
    name: 'web-service-cluster',
    type: 'ecs',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('ecs'),
    tags: { Environment: 'production', Team: 'platform', Service: 'web' },
    createdAt: new Date('2024-01-22'),
    lastUpdated: new Date(),
  },
  {
    id: 'ecs-worker-service',
    name: 'background-worker',
    type: 'ecs',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('ecs'),
    tags: { Environment: 'production', Team: 'platform', Service: 'worker' },
    createdAt: new Date('2024-01-25'),
    lastUpdated: new Date(),
  },
  {
    id: 'ecs-analytics',
    name: 'analytics-processor',
    type: 'ecs',
    status: 'running',
    region: 'eu-west-1',
    account: 'production',
    metrics: generateMetrics('ecs'),
    tags: { Environment: 'production', Team: 'analytics', Service: 'processor' },
    createdAt: new Date('2024-01-28'),
    lastUpdated: new Date(),
  },

  // Additional EC2 Instances
  {
    id: 'i-monitoring-server',
    name: 'monitoring-server-01',
    type: 'ec2',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('ec2'),
    tags: { Environment: 'production', Team: 'devops', Application: 'monitoring' },
    createdAt: new Date('2024-02-01'),
    lastUpdated: new Date(),
  },
  {
    id: 'i-bastion-host',
    name: 'bastion-host',
    type: 'ec2',
    status: 'running',
    region: 'us-west-2',
    account: 'production',
    metrics: generateMetrics('ec2'),
    tags: { Environment: 'production', Team: 'security', Application: 'bastion' },
    createdAt: new Date('2024-02-03'),
    lastUpdated: new Date(),
  },
  {
    id: 'i-cache-server',
    name: 'redis-cache-01',
    type: 'ec2',
    status: 'warning',
    region: 'eu-west-1',
    account: 'production',
    metrics: generateMetrics('ec2'),
    tags: { Environment: 'production', Team: 'backend', Application: 'cache' },
    createdAt: new Date('2024-02-05'),
    lastUpdated: new Date(),
  },

  // Additional Lambda Functions
  {
    id: 'lambda-notification',
    name: 'notification-service',
    type: 'lambda',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('lambda'),
    tags: { Environment: 'production', Team: 'backend', Function: 'notifications' },
    createdAt: new Date('2024-02-08'),
    lastUpdated: new Date(),
  },
  {
    id: 'lambda-file-upload',
    name: 'file-upload-processor',
    type: 'lambda',
    status: 'running',
    region: 'us-west-2',
    account: 'production',
    metrics: generateMetrics('lambda'),
    tags: { Environment: 'production', Team: 'media', Function: 'upload' },
    createdAt: new Date('2024-02-10'),
    lastUpdated: new Date(),
  },
  {
    id: 'lambda-scheduled-task',
    name: 'daily-report-generator',
    type: 'lambda',
    status: 'running',
    region: 'ap-south-1',
    account: 'production',
    metrics: generateMetrics('lambda'),
    tags: { Environment: 'production', Team: 'analytics', Function: 'reports' },
    createdAt: new Date('2024-02-12'),
    lastUpdated: new Date(),
  },

  // Additional S3 Buckets
  {
    id: 's3-backups',
    name: 'database-backups',
    type: 's3',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('s3'),
    tags: { Environment: 'production', Team: 'devops', Purpose: 'backups' },
    createdAt: new Date('2024-02-15'),
    lastUpdated: new Date(),
  },
  {
    id: 's3-logs',
    name: 'application-logs',
    type: 's3',
    status: 'running',
    region: 'us-west-2',
    account: 'production',
    metrics: generateMetrics('s3'),
    tags: { Environment: 'production', Team: 'devops', Purpose: 'logs' },
    createdAt: new Date('2024-02-18'),
    lastUpdated: new Date(),
  },

  // Additional RDS Instances
  {
    id: 'db-redis-cache',
    name: 'redis-session-store',
    type: 'rds',
    status: 'running',
    region: 'us-east-1',
    account: 'production',
    metrics: generateMetrics('rds'),
    tags: { Environment: 'production', Team: 'backend', Database: 'redis' },
    createdAt: new Date('2024-02-20'),
    lastUpdated: new Date(),
  },
];

// Calculate dashboard metrics from resources
export const calculateDashboardMetrics = (
  resources: CloudResource[]
): DashboardMetrics => {
  const metrics: DashboardMetrics = {
    totalResources: resources.length,
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
  };

  let totalCpu = 0;
  let totalMemory = 0;
  let totalNetwork = 0;
  let totalRequests = 0;
  let totalLatency = 0;
  let totalErrors = 0;
  let resourcesWithRequests = 0;
  let resourcesWithLatency = 0;

  resources.forEach(resource => {
    // Count by status
    switch (resource.status) {
      case 'running':
        metrics.runningResources++;
        break;
      case 'stopped':
        metrics.stoppedResources++;
        break;
      case 'warning':
        metrics.warningResources++;
        break;
      case 'error':
        metrics.errorResources++;
        break;
      case 'pending':
        metrics.pendingResources++;
        break;
      case 'terminated':
        metrics.terminatedResources++;
        break;
    }

    // Count by type
    metrics.resourcesByType[resource.type]++;

    // Count by region
    metrics.resourcesByRegion[resource.region]++;

    // Aggregate metrics
    totalCpu += resource.metrics.cpu.current;
    totalMemory += resource.metrics.memory.percentage;
    totalNetwork += resource.metrics.network.inbound + resource.metrics.network.outbound;

    // Aggregate request metrics if available
    if (resource.metrics.requests) {
      totalRequests += resource.metrics.requests.current;
      totalLatency += resource.metrics.requests.latency;
      totalErrors += resource.metrics.requests.errors;
      resourcesWithRequests++;
      resourcesWithLatency++;
    }
  });

  // Calculate averages
  metrics.totalCpuUsage = Math.round(totalCpu / resources.length);
  metrics.totalMemoryUsage = Math.round(totalMemory / resources.length);
  metrics.totalNetworkTraffic = Math.round(totalNetwork);
  metrics.totalRequests = totalRequests;
  metrics.averageLatency = resourcesWithLatency > 0 ? Math.round(totalLatency / resourcesWithLatency) : 0;
  metrics.errorRate = totalRequests > 0 ? Math.round((totalErrors / totalRequests) * 100 * 100) / 100 : 0;

  return metrics;
};

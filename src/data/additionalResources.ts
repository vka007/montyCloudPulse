import { EnhancedResource } from './enhancedMockData';

// Generate additional resources with diverse types, environments, and regions
const generateAdditionalResources = (): EnhancedResource[] => {
  const resourceTypes = ['ec2', 'rds', 'lambda', 's3', 'loadbalancer', 'cloudfront', 'apigateway', 'ecs'];
  const regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1', 'us-east-2', 'eu-central-1', 'ap-northeast-1', 'ca-central-1', 'sa-east-1', 'ap-south-1'];
  const accounts = ['prod-account', 'dev-account', 'staging-account', 'test-account'];
  const environments = ['production', 'development', 'staging', 'testing'];
  const teams = ['frontend', 'backend', 'data', 'infrastructure', 'devops', 'qa', 'security', 'analytics'];
  const projects = ['web-app', 'api-services', 'data-warehouse', 'mobile-app', 'ml-pipeline', 'monitoring', 'backup', 'cdn'];
  const statuses = ['running', 'stopped', 'warning', 'error', 'pending'];
  
  const instanceTypes: Record<string, string[]> = {
    ec2: ['t3.micro', 't3.small', 't3.medium', 't3.large', 't3.xlarge', 'm5.large', 'm5.xlarge', 'c5.large', 'r5.large'],
    rds: ['db.t3.micro', 'db.t3.small', 'db.t3.medium', 'db.r5.large', 'db.r5.xlarge', 'db.m5.large'],
    lambda: ['128MB', '256MB', '512MB', '1GB', '2GB'],
    s3: ['Standard', 'IA', 'Glacier'],
    loadbalancer: ['Application', 'Network', 'Classic'],
    cloudfront: ['Global', 'Regional'],
    apigateway: ['REST', 'HTTP', 'WebSocket'],
    ecs: ['Fargate', 'EC2']
  };

  const resources: EnhancedResource[] = [];

  for (let i = 0; i < 50; i++) {
    const type = resourceTypes[i % resourceTypes.length];
    const region = regions[i % regions.length];
    const account = accounts[i % accounts.length];
    const environment = environments[i % environments.length];
    const team = teams[i % teams.length];
    const project = projects[i % projects.length];
    const status = statuses[i % statuses.length];
    
    // Generate realistic metrics based on type
    const baseCpu = type === 'lambda' ? Math.random() * 20 + 5 : Math.random() * 60 + 20;
    const baseMemory = type === 'lambda' ? Math.random() * 30 + 10 : Math.random() * 70 + 30;
    const baseNetwork = type === 'lambda' ? Math.random() * 5 + 1 : Math.random() * 100 + 20;
    
    // Generate costs based on type and size
    let hourlyCost = 0.01;
    if (type === 'ec2') hourlyCost = Math.random() * 0.5 + 0.05;
    else if (type === 'rds') hourlyCost = Math.random() * 1.0 + 0.1;
    else if (type === 'lambda') hourlyCost = Math.random() * 0.001 + 0.0001;
    else if (type === 's3') hourlyCost = Math.random() * 0.1 + 0.01;
    else if (type === 'loadbalancer') hourlyCost = Math.random() * 0.2 + 0.02;
    else if (type === 'cloudfront') hourlyCost = Math.random() * 0.3 + 0.05;
    else if (type === 'apigateway') hourlyCost = Math.random() * 0.1 + 0.01;
    else if (type === 'ecs') hourlyCost = Math.random() * 0.4 + 0.05;

    const resource: EnhancedResource = {
      id: `${type}-${i.toString().padStart(3, '0')}-${Math.random().toString(36).substr(2, 8)}`,
      name: `${type}-${project}-${environment}-${i}`,
      type: type as any,
      status: status as any,
      region,
      account,
      instanceType: instanceTypes[type] ? instanceTypes[type][i % instanceTypes[type].length] : undefined,
      cost: {
        hourly: Math.round(hourlyCost * 10000) / 10000,
        daily: Math.round(hourlyCost * 24 * 100) / 100,
        monthly: Math.round(hourlyCost * 24 * 30 * 10) / 10,
        currency: 'USD',
      },
      metrics: {
        cpu: {
          current: Math.round(baseCpu * 10) / 10,
          average: Math.round((baseCpu + Math.random() * 10 - 5) * 10) / 10,
          max: Math.round((baseCpu + Math.random() * 20) * 10) / 10,
          history: Array.from({ length: 24 }, (_, j) => 
            Math.round((baseCpu + Math.random() * 20 - 10 + Math.sin(j * 0.3) * 10) * 10) / 10
          ),
        },
        memory: {
          current: Math.round(baseMemory * 10) / 10,
          percentage: Math.round(baseMemory * 10) / 10,
          total: type === 'lambda' ? 2 : Math.round((baseMemory / 0.7) * 10) / 10,
          history: Array.from({ length: 24 }, (_, j) => 
            Math.round((baseMemory + Math.random() * 15 - 7.5 + Math.cos(j * 0.25) * 8) * 10) / 10
          ),
        },
        network: {
          inbound: Math.round(baseNetwork * 10) / 10,
          outbound: Math.round((baseNetwork * 1.2) * 10) / 10,
          history: Array.from({ length: 24 }, (_, j) => ({
            time: `${j}:00`,
            inbound: Math.round((baseNetwork + Math.random() * 20 - 10) * 10) / 10,
            outbound: Math.round((baseNetwork * 1.2 + Math.random() * 25 - 12.5) * 10) / 10,
          })),
        },
        ...(type === 'rds' && {
          storage: {
            used: Math.round(Math.random() * 500 + 100),
            total: Math.round(Math.random() * 1000 + 500),
            iops: Math.round(Math.random() * 5000 + 1000),
          },
        }),
      },
      tags: {
        Environment: environment,
        Team: team,
        Project: project,
        Region: region,
        Account: account,
      },
      lastUpdated: new Date(),
    };

    resources.push(resource);
  }

  return resources;
};

export const additionalResources = generateAdditionalResources();

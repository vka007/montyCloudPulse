import {
  ResourceType,
  ResourceMetrics,
  MetricHistory,
} from '@/types/resources';

// Generate historical data for metrics
const generateHistoricalData = (
  baseValue: number,
  points: number = 24,
  variance: number = 0.3
): MetricHistory[] => {
  const history: MetricHistory[] = [];
  const now = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 5 * 60 * 1000); // 5-minute intervals
    const randomVariance = (Math.random() - 0.5) * variance * baseValue;
    const value = Math.max(0, Math.min(100, baseValue + randomVariance));
    
    history.push({ timestamp, value });
  }
  
  return history;
};

// Generate trend data for status cards (warning/error counts over time)
export const generateStatusTrendData = (
  currentValue: number,
  points: number = 20,
  trendDirection: 'up' | 'down' | 'stable' = 'stable'
): number[] => {
  const data: number[] = [];
  let value = Math.max(0, currentValue - Math.floor(Math.random() * 3));
  
  for (let i = 0; i < points; i++) {
    // Add some randomness
    let change = (Math.random() - 0.5) * 2;
    
    // Apply trend bias
    if (trendDirection === 'up') {
      change += 0.3;
    } else if (trendDirection === 'down') {
      change -= 0.3;
    }
    
    value = Math.max(0, Math.min(20, value + change));
    data.push(Math.round(value));
  }
  
  return data;
};

// Generate realistic CPU patterns based on resource type and time
const generateCpuMetrics = (type: ResourceType, timeOfDay: number) => {
  let baseCpu = 20;
  let variance = 0.4;
  
  // Different patterns for different resource types
  switch (type) {
    case 'ec2':
      baseCpu = 30 + Math.sin(timeOfDay * Math.PI / 12) * 20; // Daily pattern
      variance = 0.5;
      break;
    case 'rds':
      baseCpu = 15 + Math.sin((timeOfDay - 2) * Math.PI / 12) * 10;
      variance = 0.3;
      break;
    case 'lambda':
      baseCpu = 5 + Math.random() * 40; // Spiky pattern
      variance = 0.8;
      break;
    case 'ecs':
      baseCpu = 40 + Math.sin(timeOfDay * Math.PI / 12) * 15;
      variance = 0.4;
      break;
    default:
      baseCpu = 20;
  }
  
  const current = Math.max(0, Math.min(100, baseCpu + (Math.random() - 0.5) * variance * baseCpu));
  const history = generateHistoricalData(baseCpu, 24, variance);
  const average = history.reduce((sum, h) => sum + h.value, 0) / history.length;
  const peak = Math.max(...history.map(h => h.value));
  
  return {
    current: Math.round(current),
    average: Math.round(average),
    peak: Math.round(peak),
    history,
    threshold: {
      warning: 70,
      critical: 90,
    },
  };
};

// Generate memory metrics
const generateMemoryMetrics = (type: ResourceType) => {
  let baseMemory = 40;
  let total = 16384; // MB
  
  switch (type) {
    case 'ec2':
      total = 16384;
      baseMemory = 30 + Math.random() * 30;
      break;
    case 'rds':
      total = 32768;
      baseMemory = 50 + Math.random() * 20;
      break;
    case 'ecs':
      total = 8192;
      baseMemory = 60 + Math.random() * 25;
      break;
    default:
      baseMemory = 25 + Math.random() * 25;
  }
  
  const percentage = Math.min(95, baseMemory + (Math.random() - 0.5) * 10);
  const used = Math.round((percentage / 100) * total);
  const available = total - used;
  const history = generateHistoricalData(percentage, 24, 0.2);
  
  return {
    used,
    total,
    percentage: Math.round(percentage),
    available,
    history,
    threshold: {
      warning: 80,
      critical: 95,
    },
  };
};

// Generate network metrics
const generateNetworkMetrics = () => {
  const inbound = Math.round(Math.random() * 1000 + 100);
  const outbound = Math.round(Math.random() * 800 + 50);
  const packetsIn = Math.round(inbound * 10 + Math.random() * 1000);
  const packetsOut = Math.round(outbound * 8 + Math.random() * 800);
  
  return {
    inbound,
    outbound,
    packetsIn,
    packetsOut,
    history: {
      inbound: generateHistoricalData(inbound, 24, 0.4),
      outbound: generateHistoricalData(outbound, 24, 0.4),
    },
  };
};

// Generate comprehensive metrics based on resource type
export const generateResourceMetrics = (type: ResourceType): ResourceMetrics => {
  const timeOfDay = new Date().getHours();
  const cpu = generateCpuMetrics(type, timeOfDay);
  const memory = generateMemoryMetrics(type);
  const network = generateNetworkMetrics();
  
  const baseMetrics: ResourceMetrics = {
    cpu,
    memory,
    network,
  };
  
  // Add type-specific metrics
  if (['ec2', 'rds', 's3', 'ecs'].includes(type)) {
    baseMetrics.storage = {
      used: Math.round(Math.random() * 800 + 100),
      total: 1000,
      percentage: 0,
      available: 0,
      iops: Math.round(Math.random() * 3000 + 1000),
      history: generateHistoricalData(Math.random() * 60 + 20, 24, 0.3),
    };
    baseMetrics.storage.percentage = Math.round((baseMetrics.storage.used / baseMetrics.storage.total) * 100);
    baseMetrics.storage.available = baseMetrics.storage.total - baseMetrics.storage.used;
  }
  
  if (['lambda', 'apigateway', 'cloudfront'].includes(type)) {
    const baseRequests = Math.round(Math.random() * 1000 + 100);
    baseMetrics.requests = {
      current: Math.round(baseRequests + (Math.random() - 0.5) * 200),
      total: Math.round(baseRequests * 100),
      errors: Math.round(baseRequests * 0.02 + Math.random() * 10),
      latency: Math.round(Math.random() * 500 + 50),
      history: generateHistoricalData(baseRequests, 24, 0.6),
    };
  }
  
  if (['loadbalancer', 'rds'].includes(type)) {
    baseMetrics.connections = {
      active: Math.round(Math.random() * 100 + 10),
      total: Math.round(Math.random() * 1000 + 500),
      failed: Math.round(Math.random() * 5),
    };
  }
  
  return baseMetrics;
};

// Simulate real-time metric updates
export const updateResourceMetrics = (currentMetrics: ResourceMetrics, _type: ResourceType): ResourceMetrics => {
  
  // Update CPU with realistic fluctuations
  const cpuDelta = (Math.random() - 0.5) * 10;
  const newCpuCurrent = Math.max(0, Math.min(100, currentMetrics.cpu.current + cpuDelta));
  
  // Update memory more slowly
  const memoryDelta = (Math.random() - 0.5) * 2;
  const newMemoryPercentage = Math.max(0, Math.min(100, currentMetrics.memory.percentage + memoryDelta));
  const newMemoryUsed = Math.round((newMemoryPercentage / 100) * currentMetrics.memory.total);
  
  // Update network with more volatility
  const networkInDelta = (Math.random() - 0.5) * 200;
  const networkOutDelta = (Math.random() - 0.5) * 150;
  const newInbound = Math.max(0, currentMetrics.network.inbound + networkInDelta);
  const newOutbound = Math.max(0, currentMetrics.network.outbound + networkOutDelta);
  
  const updatedMetrics: ResourceMetrics = {
    ...currentMetrics,
    cpu: {
      ...currentMetrics.cpu,
      current: Math.round(newCpuCurrent),
      // Update history by adding new point and removing oldest
      history: [
        ...currentMetrics.cpu.history.slice(1),
        { timestamp: new Date(), value: newCpuCurrent }
      ],
    },
    memory: {
      ...currentMetrics.memory,
      percentage: Math.round(newMemoryPercentage),
      used: newMemoryUsed,
      available: currentMetrics.memory.total - newMemoryUsed,
      history: [
        ...currentMetrics.memory.history.slice(1),
        { timestamp: new Date(), value: newMemoryPercentage }
      ],
    },
    network: {
      ...currentMetrics.network,
      inbound: Math.round(newInbound),
      outbound: Math.round(newOutbound),
      packetsIn: Math.round(newInbound * 10 + Math.random() * 100),
      packetsOut: Math.round(newOutbound * 8 + Math.random() * 80),
      history: {
        inbound: [
          ...currentMetrics.network.history.inbound.slice(1),
          { timestamp: new Date(), value: newInbound }
        ],
        outbound: [
          ...currentMetrics.network.history.outbound.slice(1),
          { timestamp: new Date(), value: newOutbound }
        ],
      },
    },
  };
  
  // Update storage metrics if present
  if (updatedMetrics.storage) {
    const storageDelta = (Math.random() - 0.5) * 10;
    const newStorageUsed = Math.max(0, Math.min(updatedMetrics.storage.total, updatedMetrics.storage.used + storageDelta));
    
    updatedMetrics.storage = {
      ...updatedMetrics.storage,
      used: Math.round(newStorageUsed),
      percentage: Math.round((newStorageUsed / updatedMetrics.storage.total) * 100),
      available: updatedMetrics.storage.total - newStorageUsed,
      iops: Math.round(updatedMetrics.storage.iops + (Math.random() - 0.5) * 500),
      history: [
        ...updatedMetrics.storage.history.slice(1),
        { timestamp: new Date(), value: (newStorageUsed / updatedMetrics.storage.total) * 100 }
      ],
    };
  }
  
  // Update request metrics if present
  if (updatedMetrics.requests) {
    const requestsDelta = (Math.random() - 0.5) * 100;
    const newRequests = Math.max(0, updatedMetrics.requests.current + requestsDelta);
    
    updatedMetrics.requests = {
      ...updatedMetrics.requests,
      current: Math.round(newRequests),
      total: updatedMetrics.requests.total + Math.round(newRequests / 10),
      errors: Math.max(0, updatedMetrics.requests.errors + Math.round((Math.random() - 0.8) * 2)),
      latency: Math.max(10, updatedMetrics.requests.latency + (Math.random() - 0.5) * 50),
      history: [
        ...updatedMetrics.requests.history.slice(1),
        { timestamp: new Date(), value: newRequests }
      ],
    };
  }
  
  return updatedMetrics;
};

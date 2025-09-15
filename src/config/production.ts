// Production configuration
export const productionConfig = {
  app: {
    title: 'MontyCloud Pulse',
    version: '1.0.0',
    description: 'A modern React dashboard for monitoring cloud resources',
  },
  api: {
    timeout: 30000,
    retryAttempts: 3,
  },
  features: {
    analytics: true,
    errorReporting: true,
    realTimeUpdates: true,
  },
  performance: {
    chartAnimationDuration: 1000,
    realTimeUpdateInterval: 5000,
    maxChartDataPoints: 100,
  },
  security: {
    enableCSP: true,
    enableHSTS: true,
  },
} as const;

export type ProductionConfig = typeof productionConfig;

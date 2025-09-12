import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useResourceStore } from '@/store/resourceStore';
import { MetricCardData } from '@/types/resources';
import { MetricCard } from './MetricCard';
import { generateStatusTrendData } from '@/data/dataGenerator';
import { dashboardGridStyles } from './DashboardGrid.styles';

export const DashboardGrid: React.FC = () => {
  const {
    dashboardMetrics,
    loading,
    error,
    refreshData,
    lastUpdated,
    isRealTimeActive,
    startRealTimeUpdates,
    stopRealTimeUpdates,
  } = useResourceStore();

  // State for frequent status updates
  const [statusUpdateCount, setStatusUpdateCount] = useState(0);
  const [warningTrendData, setWarningTrendData] = useState<number[]>([]);
  const [errorTrendData, setErrorTrendData] = useState<number[]>([]);

  // Load initial data and start real-time updates
  useEffect(() => {
    refreshData().then(() => {
      startRealTimeUpdates();
    });
    
    // Cleanup on unmount
    return () => {
      stopRealTimeUpdates();
    };
  }, [refreshData, startRealTimeUpdates, stopRealTimeUpdates]);

  // Frequent updates for Resource Status Overview (every 2 seconds)
  useEffect(() => {
    if (!isRealTimeActive) return;

    const statusInterval = setInterval(() => {
      setStatusUpdateCount(prev => prev + 1);
      
      // Update trend data for warning and error cards
      setWarningTrendData(generateStatusTrendData(
        dashboardMetrics.warningResources,
        20,
        Math.random() > 0.6 ? 'down' : 'stable'
      ));
      
      setErrorTrendData(generateStatusTrendData(
        dashboardMetrics.errorResources,
        20,
        Math.random() > 0.7 ? 'down' : 'stable'
      ));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(statusInterval);
  }, [isRealTimeActive, dashboardMetrics.warningResources, dashboardMetrics.errorResources]);

  // Initialize trend data
  useEffect(() => {
    setWarningTrendData(generateStatusTrendData(dashboardMetrics.warningResources, 20, 'stable'));
    setErrorTrendData(generateStatusTrendData(dashboardMetrics.errorResources, 20, 'stable'));
  }, [dashboardMetrics.warningResources, dashboardMetrics.errorResources]);

  const handleRefresh = () => {
    refreshData();
  };

  if (loading && !lastUpdated) {
    return (
      <Box sx={dashboardGridStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={dashboardGridStyles.errorContainer}>
        <Typography sx={dashboardGridStyles.errorText}>
          {error}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={handleRefresh}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // Prepare metric cards data with enhanced features
  const statusMetrics: MetricCardData[] = [
    {
      title: 'Total Resources',
      value: dashboardMetrics.totalResources,
      subtitle: 'Active cloud resources',
      color: 'primary',
      trend: 'stable',
      trendValue: 0,
      isLive: isRealTimeActive,
      lastUpdated: lastUpdated || undefined,
      additionalInfo: [
        { label: 'Regions', value: Object.keys(dashboardMetrics.resourcesByRegion).length },
        { label: 'Types', value: Object.keys(dashboardMetrics.resourcesByType).length },
      ],
    },
    {
      title: 'Running',
      value: dashboardMetrics.runningResources,
      subtitle: 'Healthy resources',
      color: 'success',
      trend: 'up',
      trendValue: 5,
      isLive: isRealTimeActive,
      lastUpdated: lastUpdated || undefined,
      additionalInfo: [
        { label: 'Uptime', value: '99.9%' },
      ],
    },
    {
      title: 'Warning',
      value: dashboardMetrics.warningResources + Math.floor(statusUpdateCount * 0.1) % 2, // Slight variation
      subtitle: 'Need attention',
      color: 'warning',
      trend: warningTrendData.length > 1 && warningTrendData[warningTrendData.length - 1] < warningTrendData[warningTrendData.length - 2] ? 'down' : 'up',
      trendValue: warningTrendData.length > 1 ? Math.abs(warningTrendData[warningTrendData.length - 1] - warningTrendData[warningTrendData.length - 2]) : 0,
      isLive: isRealTimeActive,
      lastUpdated: new Date(),
      threshold: { warning: 3, critical: 5 },
      sparklineData: warningTrendData,
    },
    {
      title: 'Error',
      value: dashboardMetrics.errorResources + Math.floor(statusUpdateCount * 0.05) % 2, // Slight variation
      subtitle: 'Critical issues',
      color: 'error',
      trend: errorTrendData.length > 1 && errorTrendData[errorTrendData.length - 1] < errorTrendData[errorTrendData.length - 2] ? 'down' : 'up',
      trendValue: errorTrendData.length > 1 ? Math.abs(errorTrendData[errorTrendData.length - 1] - errorTrendData[errorTrendData.length - 2]) : 0,
      isLive: isRealTimeActive,
      lastUpdated: new Date(),
      threshold: { warning: 1, critical: 3 },
      sparklineData: errorTrendData,
    },
  ];

  const typeMetrics: MetricCardData[] = [
    {
      title: 'EC2 Instances',
      value: dashboardMetrics.resourcesByType.ec2,
      subtitle: 'Virtual servers',
      color: 'primary',
      isLive: isRealTimeActive,
    },
    {
      title: 'RDS Databases',
      value: dashboardMetrics.resourcesByType.rds,
      subtitle: 'Managed databases',
      color: 'secondary',
      isLive: isRealTimeActive,
    },
    {
      title: 'Lambda Functions',
      value: dashboardMetrics.resourcesByType.lambda,
      subtitle: 'Serverless functions',
      color: 'success',
      isLive: isRealTimeActive,
    },
    {
      title: 'ECS Services',
      value: dashboardMetrics.resourcesByType.ecs,
      subtitle: 'Container services',
      color: 'warning',
      isLive: isRealTimeActive,
    },
    {
      title: 'CloudFront',
      value: dashboardMetrics.resourcesByType.cloudfront,
      subtitle: 'CDN distributions',
      color: 'error',
      isLive: isRealTimeActive,
    },
  ];

  // Performance metrics with enhanced data
  const performanceMetrics: MetricCardData[] = [
    {
      title: 'Average CPU',
      value: dashboardMetrics.totalCpuUsage,
      unit: '%',
      subtitle: 'Across all resources',
      color: dashboardMetrics.totalCpuUsage > 80 ? 'error' : dashboardMetrics.totalCpuUsage > 60 ? 'warning' : 'success',
      isLive: isRealTimeActive,
      threshold: { warning: 70, critical: 90 },
      sparklineData: Array.from({ length: 20 }, (_, i) => 
        dashboardMetrics.totalCpuUsage + Math.sin(i * 0.5) * 10 + (Math.random() - 0.5) * 5
      ),
    },
    {
      title: 'Average Memory',
      value: dashboardMetrics.totalMemoryUsage,
      unit: '%',
      subtitle: 'Memory utilization',
      color: dashboardMetrics.totalMemoryUsage > 85 ? 'error' : dashboardMetrics.totalMemoryUsage > 70 ? 'warning' : 'success',
      isLive: isRealTimeActive,
      threshold: { warning: 80, critical: 95 },
    },
    {
      title: 'Network Traffic',
      value: Math.round(dashboardMetrics.totalNetworkTraffic / 1024),
      unit: 'GB/s',
      subtitle: 'Total throughput',
      color: 'primary',
      isLive: isRealTimeActive,
    },
    {
      title: 'Total Requests',
      value: dashboardMetrics.totalRequests,
      unit: '/min',
      subtitle: 'API requests',
      color: 'success',
      isLive: isRealTimeActive,
      trend: 'up',
      trendValue: 12,
    },
    {
      title: 'Error Rate',
      value: dashboardMetrics.errorRate,
      unit: '%',
      subtitle: 'Request failures',
      color: dashboardMetrics.errorRate > 5 ? 'error' : dashboardMetrics.errorRate > 2 ? 'warning' : 'success',
      isLive: isRealTimeActive,
      threshold: { warning: 2, critical: 5 },
      trend: dashboardMetrics.errorRate > 2 ? 'up' : 'down',
      trendValue: dashboardMetrics.errorRate > 2 ? 15 : -8,
    },
  ];

  return (
    <Box sx={dashboardGridStyles.container}>

      {/* Resource Status Overview */}
      <Typography variant="h5" sx={dashboardGridStyles.sectionTitle}>
        Resource Status Overview
      </Typography>
      <Grid container spacing={3} sx={dashboardGridStyles.metricsGrid}>
        {statusMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box sx={dashboardGridStyles.gridItem}>
              <MetricCard data={metric} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Performance Metrics */}
      <Typography variant="h5" sx={dashboardGridStyles.sectionTitle}>
        Performance Metrics
      </Typography>
      <Grid container spacing={3} sx={dashboardGridStyles.metricsGrid}>
        {performanceMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Box sx={dashboardGridStyles.gridItem}>
              <MetricCard data={metric} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Resource Types */}
      <Typography variant="h5" sx={dashboardGridStyles.sectionTitle}>
        Resource Types
      </Typography>
      <Grid container spacing={3}>
        {typeMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Box sx={dashboardGridStyles.gridItem}>
              <MetricCard data={metric} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

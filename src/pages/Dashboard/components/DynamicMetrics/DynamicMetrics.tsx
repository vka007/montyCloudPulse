import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import {
  AttachMoney,
  Speed,
  Storage,
  NetworkCheck,
} from '@mui/icons-material';
import { MetricCard } from '../MetricCard/MetricCard';
import { CPUTrendChart, MemoryChart, NetworkTrafficChart, GaugeChart } from '@/components/base/Charts';
import { EnhancedResource } from '@/data/enhancedMockData';
import { dynamicMetricsStyles } from './DynamicMetrics.styles';

interface DynamicMetricsProps {
  selectedResources: EnhancedResource[];
  isAllResources: boolean;
}

export const DynamicMetrics: React.FC<DynamicMetricsProps> = ({
  selectedResources,
  isAllResources,
}) => {
  // Calculate aggregated metrics
  const aggregatedMetrics = React.useMemo(() => {
    if (selectedResources.length === 0) return null;

    const totalCost = Math.round(selectedResources.reduce((sum, resource) => sum + resource.cost.monthly, 0) * 10) / 10;
    const avgCpuUsage = selectedResources.reduce((sum, resource) => sum + resource.metrics.cpu.current, 0) / selectedResources.length;
    const avgMemoryUsage = selectedResources.reduce((sum, resource) => sum + resource.metrics.memory.percentage, 0) / selectedResources.length;
    const totalNetworkIn = selectedResources.reduce((sum, resource) => sum + resource.metrics.network.inbound, 0);
    const totalNetworkOut = selectedResources.reduce((sum, resource) => sum + resource.metrics.network.outbound, 0);

    return {
      totalCost,
      avgCpuUsage,
      avgMemoryUsage,
      totalNetworkIn,
      totalNetworkOut,
      resourceCount: selectedResources.length,
    };
  }, [selectedResources]);

  const singleResource = selectedResources.length === 1 ? selectedResources[0] : null;

  if (!aggregatedMetrics) {
    return (
      <Box sx={dynamicMetricsStyles.emptyState}>
        <Typography variant="h6" color="text.secondary">
          No resources selected
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please select resources to view metrics and costs
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={dynamicMetricsStyles.container}>
      {/* Resource Summary Header */}
      <Paper elevation={1} sx={dynamicMetricsStyles.summaryHeader}>
        <Box sx={dynamicMetricsStyles.summaryContent}>
          <Box>
            <Typography variant="h5" sx={dynamicMetricsStyles.summaryTitle}>
              {isAllResources ? 'All Resources Overview' : 
               singleResource ? singleResource.name : 
               `${aggregatedMetrics.resourceCount} Selected Resources`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isAllResources ? 'Aggregated metrics across all resources' :
               singleResource ? `${singleResource.type.toUpperCase()} instance in ${singleResource.region}` :
               'Aggregated metrics for selected resources'}
            </Typography>
          </Box>
          
          <Box sx={dynamicMetricsStyles.costSummary}>
            <Box sx={dynamicMetricsStyles.costItem}>
              <Box>
                <Typography variant="h6" color="primary.main">
                  ${aggregatedMetrics.totalCost.toFixed(1)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Monthly Cost
                </Typography>
              </Box>
            </Box>
            
            {!isAllResources && (
              <Chip
                label={`${aggregatedMetrics.resourceCount} Resource${aggregatedMetrics.resourceCount !== 1 ? 's' : ''}`}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
          </Box>
        </Box>
      </Paper>

      {/* Key Metrics Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            data={{
              title: 'Average CPU',
              value: Math.round(aggregatedMetrics.avgCpuUsage * 10) / 10,
              subtitle: isAllResources ? 'Across all resources' : 'Selected resources',
              color: aggregatedMetrics.avgCpuUsage > 80 ? 'error' : aggregatedMetrics.avgCpuUsage > 60 ? 'warning' : 'success',
              trend: aggregatedMetrics.avgCpuUsage > 50 ? 'up' : 'down',
              trendValue: Math.round((aggregatedMetrics.avgCpuUsage - 45) / 45 * 100 * 10) / 10,
              unit: '%',
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            data={{
              title: 'Average Memory',
              value: Math.round(aggregatedMetrics.avgMemoryUsage * 10) / 10,
              subtitle: 'Memory utilization',
              color: aggregatedMetrics.avgMemoryUsage > 85 ? 'error' : aggregatedMetrics.avgMemoryUsage > 70 ? 'warning' : 'success',
              trend: aggregatedMetrics.avgMemoryUsage > 60 ? 'up' : 'down',
              trendValue: Math.round((aggregatedMetrics.avgMemoryUsage - 55) / 55 * 100 * 10) / 10,
              unit: '%',
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            data={{
              title: 'Network Traffic',
              value: Math.round((aggregatedMetrics.totalNetworkIn + aggregatedMetrics.totalNetworkOut) * 10) / 10,
              subtitle: 'Total throughput',
              color: 'primary',
              trend: 'up',
              trendValue: 8,
              unit: 'MB/s',
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            data={{
              title: 'Monthly Cost',
              value: aggregatedMetrics.totalCost,
              subtitle: 'Estimated billing',
              color: 'secondary',
              trend: aggregatedMetrics.totalCost > 200 ? 'up' : 'stable',
              trendValue: aggregatedMetrics.totalCost > 200 ? 12 : 0,
              unit: 'USD',
            }}
          />
        </Grid>
      </Grid>

      {/* Detailed Charts */}
      {singleResource ? (
        // Single Resource Detailed View
        <>
          <Typography variant="h6" sx={dynamicMetricsStyles.sectionTitle}>
            Detailed Metrics for {singleResource.name}
          </Typography>
          
          <Grid container spacing={3}>
            {/* CPU and Memory Gauges */}
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={dynamicMetricsStyles.chartPaper}>
                <GaugeChart
                  value={singleResource.metrics.cpu.current}
                  title="CPU Usage"
                  unit="%"
                  height={300}
                  thresholds={{ good: 50, warning: 75, critical: 90 }}
                />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={dynamicMetricsStyles.chartPaper}>
                <GaugeChart
                  value={singleResource.metrics.memory.percentage}
                  title="Memory Usage"
                  unit="%"
                  height={300}
                  thresholds={{ good: 60, warning: 80, critical: 95 }}
                />
              </Paper>
            </Grid>

            {/* CPU Trend */}
            <Grid item xs={12} lg={8}>
              <Paper elevation={2} sx={dynamicMetricsStyles.chartPaper}>
                <CPUTrendChart
                  data={singleResource.metrics.cpu.history.map((value, index) => ({
                    time: `${index}:00`,
                    value: Math.round(value * 10) / 10,
                  }))}
                  title={`CPU Usage Trend - ${singleResource.name}`}
                  height={350}
                />
              </Paper>
            </Grid>

            {/* Network Traffic */}
            <Grid item xs={12} lg={4}>
              <Paper elevation={2} sx={dynamicMetricsStyles.chartPaper}>
                <NetworkTrafficChart
                  data={singleResource.metrics.network.history}
                  title="Network Traffic"
                  height={350}
                />
              </Paper>
            </Grid>

            {/* Resource Details */}
            <Grid item xs={12}>
              <Paper elevation={1} sx={dynamicMetricsStyles.detailsPaper}>
                <Typography variant="h6" sx={dynamicMetricsStyles.detailsTitle}>
                  Resource Details
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={dynamicMetricsStyles.detailItem}>
                      <Speed color="primary" />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          Instance Type
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {singleResource.instanceType || 'N/A'}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {singleResource.metrics.storage && (
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={dynamicMetricsStyles.detailItem}>
                        <Storage color="primary" />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            Storage
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {singleResource.metrics.storage.used}GB / {singleResource.metrics.storage.total}GB
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={dynamicMetricsStyles.detailItem}>
                      <AttachMoney color="primary" />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          Hourly Cost
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${singleResource.cost.hourly.toFixed(1)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={dynamicMetricsStyles.detailItem}>
                      <NetworkCheck color="primary" />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          Region
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {singleResource.region}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* Tags */}
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                    Tags
                  </Typography>
                  <Box sx={dynamicMetricsStyles.tagsContainer}>
                    {Object.entries(singleResource.tags).map(([key, value]) => (
                      <Chip
                        key={key}
                        label={`${key}: ${value}`}
                        size="small"
                        variant="outlined"
                        sx={dynamicMetricsStyles.tagChip}
                      />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      ) : (
        // Multiple Resources Aggregated View
        <>
          <Typography variant="h6" sx={dynamicMetricsStyles.sectionTitle}>
            Aggregated Performance Metrics
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Paper elevation={2} sx={dynamicMetricsStyles.chartPaper}>
                <CPUTrendChart
                  data={Array.from({ length: 24 }, (_, i) => ({
                    time: `${i}:00`,
                    value: Math.round(
                      (selectedResources.reduce((sum, resource) => 
                        sum + (resource.metrics.cpu.history[i] || 0), 0
                      ) / selectedResources.length) * 10
                    ) / 10,
                  }))}
                  title="Average CPU Usage Across Resources"
                  height={350}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Paper elevation={2} sx={dynamicMetricsStyles.chartPaper}>
                <MemoryChart
                  data={{
                    allocated: selectedResources.reduce((sum, r) => sum + r.metrics.memory.total, 0),
                    used: selectedResources.reduce((sum, r) => sum + r.metrics.memory.current, 0),
                    cached: selectedResources.reduce((sum, r) => sum + r.metrics.memory.total * 0.2, 0),
                    free: selectedResources.reduce((sum, r) => sum + (r.metrics.memory.total - r.metrics.memory.current), 0),
                  }}
                  title="Aggregated Memory Usage"
                  height={350}
                />
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

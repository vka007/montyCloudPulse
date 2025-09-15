import React from 'react';
import {
  Typography,
  Box,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Cloud,
  Storage,
  Functions,
  Dataset,
  NetworkCheck,
  CloudQueue,
  Api,
  ViewInAr,
} from '@mui/icons-material';
import { Card } from '@/components/base/Card/Card';
import { Progress } from '@/components/base/Progress/Progress';
import { EChart } from '@/components/base/EChart/EChart';
import { MetricCardData } from '@/types/resources';
import { metricCardStyles } from './MetricCard.styles';

interface MetricCardProps {
  data: MetricCardData;
  size?: 'small' | 'medium' | 'large' | 'default';
}

const getIconByTitle = (title: string) => {
  const iconMap: Record<string, React.ReactElement> = {
    'Total Resources': <Cloud />,
    'Running': <TrendingUp />,
    'Stopped': <TrendingFlat />,
    'Warning': <TrendingUp />,
    'Error': <TrendingDown />,
    'EC2 Instances': <Cloud />,
    'RDS Databases': <Dataset />,
    'Lambda Functions': <Functions />,
    'S3 Buckets': <Storage />,
    'Load Balancers': <NetworkCheck />,
    'CloudFront': <CloudQueue />,
    'API Gateway': <Api />,
    'ECS Services': <ViewInAr />,
    'Average CPU': <TrendingUp />,
    'Average Memory': <Dataset />,
    'Network Traffic': <NetworkCheck />,
    'Total Requests': <Api />,
    'Average Latency': <TrendingFlat />,
    'Error Rate': <TrendingDown />,
  };
  
  return iconMap[title] || <Cloud />;
};

// Simple mini chart component using ECharts
const MiniChart: React.FC<{ 
  data: number[]; 
  color: string; 
  type?: 'line' | 'bar'; 
  title: string;
}> = ({ data, color, type = 'line', title }) => {
  if (!data || data.length === 0) return null;
  
  const chartOption = {
    grid: {
      left: 0,
      right: 0,
      top: 5,
      bottom: 5,
    },
    xAxis: {
      type: 'category',
      show: false,
      data: data.map((_, i) => i),
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [{
      name: title,
      type: type,
      data: data,
      smooth: type === 'line',
      symbol: 'none',
      lineStyle: {
        color: color,
        width: 2,
      },
      itemStyle: {
        color: color,
      },
      areaStyle: type === 'line' ? {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: color + '40' },
            { offset: 1, color: color + '10' }
          ],
        },
      } : undefined,
    }],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: color,
      textStyle: { color: '#fff' },
    },
  };

  return (
    <Box sx={metricCardStyles.miniChart}>
      <EChart option={chartOption} height={50} />
    </Box>
  );
};

const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up':
      return <TrendingUp />;
    case 'down':
      return <TrendingDown />;
    case 'stable':
      return <TrendingFlat />;
    default:
      return null;
  }
};

const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up':
      return 'success.main';
    case 'down':
      return 'error.main';
    case 'stable':
      return 'text.secondary';
    default:
      return 'text.secondary';
  }
};

export const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  const theme = useTheme();
  const { 
    title, 
    value, 
    subtitle, 
    trend, 
    trendValue, 
    color = 'primary',
    unit,
    sparklineData,
    threshold,
    additionalInfo,
    isLive
  } = data;

  const cardColor = theme.palette[color]?.main || theme.palette.primary.main;
  const trendIcon = getTrendIcon(trend);
  const trendColor = getTrendColor(trend);

  // Calculate threshold percentage for progress bar
  const getThresholdPercentage = () => {
    if (!threshold || typeof value !== 'number') return 0;
    return Math.min(100, (value / threshold.critical) * 100);
  };

  const getThresholdColor = (): 'success' | 'warning' | 'error' => {
    if (!threshold || typeof value !== 'number') return 'success';
    if (value >= threshold.critical) return 'error';
    if (value >= threshold.warning) return 'warning';
    return 'success';
  };

  // Determine chart type based on metric
  const getChartType = (): 'line' | 'bar' => {
    if (title.includes('CPU') || title.includes('Memory') || title.includes('Network')) {
      return 'bar';
    }
    return 'line';
  };

  return (
    <Card variant="elevated" size="medium" interactive>
      {/* Live indicator */}
      {isLive && <Box sx={metricCardStyles.liveIndicator} />}
      
      <Box sx={metricCardStyles.header}>
        <Box sx={metricCardStyles.titleSection}>
          <Typography sx={metricCardStyles.title}>
            {title}
          </Typography>
          <Box sx={{ ...metricCardStyles.icon, color: cardColor }}>
            {getIconByTitle(title)}
          </Box>
        </Box>
        
        {/* Trend indicator in header */}
        {trend && trendValue !== undefined && (
          <Box sx={metricCardStyles.trendContainer}>
            <Box sx={{ ...metricCardStyles.trendIcon, color: trendColor }}>
              {trendIcon}
            </Box>
            <Typography 
              sx={{ ...metricCardStyles.trendText, color: trendColor }}
            >
              {trendValue > 0 ? '+' : ''}{trendValue}%
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={metricCardStyles.valueContainer}>
        <Typography 
          sx={{ ...metricCardStyles.value, color: theme.palette.text.primary }}
        >
          {value}
          {unit && (
            <Typography 
              component="span" 
              sx={{ 
                fontSize: '1rem', 
                fontWeight: 500, 
                color: theme.palette.text.secondary,
                ml: 0.5 
              }}
            >
              {unit}
            </Typography>
          )}
        </Typography>

        {subtitle && (
          <Typography sx={metricCardStyles.subtitle}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Mini chart for performance metrics only */}
      {sparklineData && sparklineData.length > 0 && (
        title.includes('CPU') || title.includes('Memory') || title.includes('Network') || 
        title.includes('Requests') || title.includes('Error Rate')
      ) && (
        <MiniChart 
          data={sparklineData} 
          color={cardColor} 
          type={getChartType()}
          title={title}
        />
      )}

      {/* Threshold bar for performance metrics */}
      {threshold && typeof value === 'number' && (
        <Tooltip title={`Warning: ${threshold.warning}${unit || ''}, Critical: ${threshold.critical}${unit || ''}`}>
          <Box sx={metricCardStyles.thresholdBar}>
            <Progress
              type="linear"
              variant="determinate"
              value={getThresholdPercentage()}
              color={getThresholdColor()}
              size="small"
            />
          </Box>
        </Tooltip>
      )}

      {/* Additional information */}
      {additionalInfo && additionalInfo.length > 0 && (
        <Box sx={metricCardStyles.additionalInfo}>
          {additionalInfo.map((info, index) => (
            <Box key={index} sx={metricCardStyles.infoRow}>
              <Typography sx={metricCardStyles.infoLabel}>
                {info.label}
              </Typography>
              <Typography sx={metricCardStyles.infoValue}>
                {info.value}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
};

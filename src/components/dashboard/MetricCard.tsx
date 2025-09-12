import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  LinearProgress,
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
import { MetricCardData } from '@/types/resources';
import { metricCardStyles } from './MetricCard.styles';

interface MetricCardProps {
  data: MetricCardData;
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

// Simple sparkline component
const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  if (!data || data.length === 0) return null;
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <Box sx={metricCardStyles.sparkline}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
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
    isLive,
    lastUpdated
  } = data;

  const cardColor = theme.palette[color]?.main || theme.palette.primary.main;
  const trendIcon = getTrendIcon(trend);
  const trendColor = getTrendColor(trend);

  // Calculate threshold percentage for progress bar
  const getThresholdPercentage = () => {
    if (!threshold || typeof value !== 'number') return 0;
    return Math.min(100, (value / threshold.critical) * 100);
  };

  const getThresholdColor = () => {
    if (!threshold || typeof value !== 'number') return 'primary';
    if (value >= threshold.critical) return 'error';
    if (value >= threshold.warning) return 'warning';
    return 'success';
  };

  return (
    <Card sx={metricCardStyles.card}>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        {/* Live indicator */}
        {isLive && <Box sx={metricCardStyles.liveIndicator} />}
        
        <Box sx={metricCardStyles.header}>
          <Typography sx={metricCardStyles.title}>
            {title}
          </Typography>
          <Box sx={{ ...metricCardStyles.icon, color: cardColor }}>
            {getIconByTitle(title)}
          </Box>
        </Box>

        <Box sx={metricCardStyles.valueContainer}>
          <Typography 
            sx={{ ...metricCardStyles.value, color: cardColor }}
          >
            {value}{unit && <span style={{ fontSize: '0.7em' }}> {unit}</span>}
          </Typography>

          {subtitle && (
            <Typography sx={metricCardStyles.subtitle}>
              {subtitle}
            </Typography>
          )}

          {/* Sparkline chart */}
          {sparklineData && sparklineData.length > 0 && (
            <Sparkline data={sparklineData} color={cardColor} />
          )}

          {/* Threshold bar */}
          {threshold && typeof value === 'number' && (
            <Tooltip title={`Warning: ${threshold.warning}${unit || ''}, Critical: ${threshold.critical}${unit || ''}`}>
              <Box sx={metricCardStyles.thresholdBar}>
                <LinearProgress
                  variant="determinate"
                  value={getThresholdPercentage()}
                  color={getThresholdColor()}
                  sx={metricCardStyles.thresholdFill}
                />
              </Box>
            </Tooltip>
          )}

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

        {/* Last updated timestamp */}
        {lastUpdated && (
          <Typography sx={metricCardStyles.lastUpdated}>
            Updated: {lastUpdated.toLocaleTimeString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

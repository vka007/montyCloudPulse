import React from 'react';
import { Box, useTheme } from '@mui/material';
import { EChart } from '@/components/base/EChart/EChart';

interface GaugeChartProps {
  value: number;
  max?: number;
  title?: string;
  unit?: string;
  height?: number;
  thresholds?: {
    good: number;
    warning: number;
    critical: number;
  };
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ 
  value, 
  max = 100, 
  title = "System Health", 
  unit = "%",
  height = 250,
  thresholds = { good: 60, warning: 80, critical: 95 }
}) => {
  const theme = useTheme();

  const getColor = () => {
    if (value <= thresholds.good) return theme.palette.success.main;
    if (value <= thresholds.warning) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const option = {
    title: {
      text: title,
      textStyle: {
        color: theme.palette.text.primary,
        fontSize: 14,
        fontWeight: 600,
      },
      left: 'center',
      top: 10,
    },
    series: [
      {
        name: title,
        type: 'gauge',
        center: ['50%', '60%'],
        radius: '80%',
        min: 0,
        max: max,
        progress: {
          show: true,
          width: 12,
        },
        pointer: {
          show: true,
          length: '60%',
          width: 6,
          itemStyle: {
            color: getColor(),
          },
        },
        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [thresholds.good / max, theme.palette.success.main],
              [thresholds.warning / max, theme.palette.warning.main],
              [thresholds.critical / max, theme.palette.error.main],
              [1, theme.palette.error.dark],
            ],
          },
        },
        axisTick: {
          distance: -20,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: theme.palette.text.secondary,
          },
        },
        splitLine: {
          distance: -25,
          length: 8,
          lineStyle: {
            width: 3,
            color: theme.palette.text.secondary,
          },
        },
        axisLabel: {
          distance: -35,
          color: theme.palette.text.secondary,
          fontSize: 10,
          formatter: (value: number) => `${value}${unit}`,
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 15,
          itemStyle: {
            borderWidth: 2,
            borderColor: getColor(),
            color: theme.palette.background.paper,
          },
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '35%'],
          fontSize: 24,
          fontWeight: 'bold',
          formatter: `{value}${unit}`,
          color: getColor(),
          backgroundColor: theme.palette.background.paper,
          borderColor: getColor(),
          borderWidth: 2,
        },
        data: [
          {
            value: value,
            name: title,
          },
        ],
      },
    ],
    animation: true,
    animationDuration: 1500,
    animationEasing: 'cubicOut',
  };

  return (
    <Box>
      <EChart option={option} height={height} />
    </Box>
  );
};

import React from 'react';
import { Box, useTheme } from '@mui/material';
import { EChart } from '@/components/base/EChart/EChart';

interface CPUTrendChartProps {
  data: Array<{ time: string; value: number }>;
  height?: number;
  title?: string;
}

export const CPUTrendChart: React.FC<CPUTrendChartProps> = ({ 
  data, 
  height = 300, 
  title = "CPU Usage Trend" 
}) => {
  const theme = useTheme();

  const option = {
    title: {
      text: title,
      textStyle: {
        color: theme.palette.text.primary,
        fontSize: 16,
        fontWeight: 600,
      },
      left: 'left',
      top: 10,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderColor: theme.palette.primary.main,
      textStyle: { 
        color: theme.palette.text.primary,
        fontSize: 12,
      },
      formatter: (params: any) => {
        const data = params[0];
        return `
          <div style="padding: 8px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${data.axisValue}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-block; width: 10px; height: 10px; background-color: ${data.color}; border-radius: 50%;"></span>
              CPU Usage: <strong>${data.value}%</strong>
            </div>
          </div>
        `;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map(item => item.time),
      axisLine: {
        lineStyle: { color: theme.palette.divider }
      },
      axisLabel: {
        color: theme.palette.text.secondary,
        fontSize: 11,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: theme.palette.divider,
          opacity: 0.3,
        },
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value}%',
        color: theme.palette.text.secondary,
        fontSize: 11,
      },
      axisLine: {
        lineStyle: { color: theme.palette.divider }
      },
      splitLine: {
        lineStyle: {
          color: theme.palette.divider,
          opacity: 0.3,
        },
      },
    },
    series: [
      {
        name: 'CPU Usage',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: data.map(item => item.value),
        lineStyle: {
          color: theme.palette.primary.main,
          width: 3,
        },
        itemStyle: {
          color: theme.palette.primary.main,
          borderWidth: 2,
          borderColor: '#fff',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: theme.palette.primary.main + '40' },
              { offset: 1, color: theme.palette.primary.main + '10' }
            ],
          },
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: theme.palette.primary.main,
          },
        },
      },
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
  };

  return (
    <Box>
      <EChart option={option} height={height} />
    </Box>
  );
};

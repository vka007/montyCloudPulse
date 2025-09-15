import React from 'react';
import { Box, useTheme } from '@mui/material';
import { EChart } from '@/components/base/EChart/EChart';

interface MemoryChartProps {
  data: {
    allocated: number;
    used: number;
    cached: number;
    free: number;
  };
  height?: number;
  title?: string;
}

export const MemoryChart: React.FC<MemoryChartProps> = ({ 
  data, 
  height = 300, 
  title = "Memory Consumption" 
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
        let tooltip = `<div style="padding: 8px; min-width: 200px;">`;
        tooltip += `<div style="font-weight: 600; margin-bottom: 8px;">Memory Usage</div>`;
        
        params.forEach((param: any) => {
          tooltip += `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 10px; height: 10px; background-color: ${param.color}; border-radius: 2px;"></span>
                ${param.seriesName}
              </div>
              <strong>${param.value} GB</strong>
            </div>
          `;
        });
        
        tooltip += `</div>`;
        return tooltip;
      },
    },
    legend: {
      top: 35,
      left: 'left',
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 12,
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '20%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['Memory'],
      axisLine: {
        lineStyle: { color: theme.palette.divider }
      },
      axisLabel: {
        color: theme.palette.text.secondary,
        fontSize: 11,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} GB',
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
        name: 'Used',
        type: 'bar',
        stack: 'memory',
        data: [data.used],
        itemStyle: {
          color: theme.palette.error.main,
          borderRadius: [0, 0, 0, 0],
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: theme.palette.error.main + '50',
          },
        },
      },
      {
        name: 'Cached',
        type: 'bar',
        stack: 'memory',
        data: [data.cached],
        itemStyle: {
          color: theme.palette.warning.main,
          borderRadius: [0, 0, 0, 0],
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: theme.palette.warning.main + '50',
          },
        },
      },
      {
        name: 'Free',
        type: 'bar',
        stack: 'memory',
        data: [data.free],
        itemStyle: {
          color: theme.palette.success.main,
          borderRadius: [0, 0, 4, 4],
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: theme.palette.success.main + '50',
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

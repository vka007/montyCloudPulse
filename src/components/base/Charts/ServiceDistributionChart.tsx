import React from 'react';
import { Box, useTheme } from '@mui/material';
import { EChart } from '@/components/base/EChart/EChart';

interface ServiceDistributionChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  height?: number;
  title?: string;
}

export const ServiceDistributionChart: React.FC<ServiceDistributionChartProps> = ({ 
  data, 
  height = 300, 
  title = "Service Distribution" 
}) => {
  const theme = useTheme();

  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  const processedData = data.map((item, index) => ({
    ...item,
    itemStyle: {
      color: item.color || colors[index % colors.length],
    },
  }));

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
      trigger: 'item',
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderColor: theme.palette.primary.main,
      textStyle: { 
        color: theme.palette.text.primary,
        fontSize: 12,
      },
      formatter: (params: any) => {
        const percentage = ((params.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);
        return `
          <div style="padding: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="display: inline-block; width: 10px; height: 10px; background-color: ${params.color}; border-radius: 50%;"></span>
              <strong>${params.name}</strong>
            </div>
            <div style="margin-left: 18px;">
              <div>Instances: <strong>${params.value}</strong></div>
              <div>Percentage: <strong>${percentage}%</strong></div>
            </div>
          </div>
        `;
      },
    },
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      left: 'center',
      bottom: 20,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 11,
      },
      pageTextStyle: {
        color: theme.palette.text.secondary,
      },
    },
    series: [
      {
        name: 'Services',
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['50%', '55%'],
        data: processedData,
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            scale: true,
            scaleSize: 5,
          },
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.palette.text.primary,
          },
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          borderWidth: 2,
          borderColor: theme.palette.background.paper,
        },
      },
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    animationType: 'scale',
    animationDelay: (idx: number) => idx * 100,
  };

  return (
    <Box>
      <EChart option={option} height={height} />
    </Box>
  );
};

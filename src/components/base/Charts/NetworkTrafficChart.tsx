import React from 'react';
import { Box, useTheme } from '@mui/material';
import { EChart } from '@/components/base/EChart/EChart';

interface NetworkTrafficChartProps {
  data: Array<{ time: string; inbound: number; outbound: number }>;
  height?: number;
  title?: string;
}

export const NetworkTrafficChart: React.FC<NetworkTrafficChartProps> = ({ 
  data, 
  height = 300, 
  title = "Network Traffic" 
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
        let tooltip = `<div style="padding: 8px; min-width: 180px;">`;
        tooltip += `<div style="font-weight: 600; margin-bottom: 8px;">${params[0].axisValue}</div>`;
        
        params.forEach((param: any) => {
          tooltip += `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 10px; height: 10px; background-color: ${param.color}; border-radius: 50%;"></span>
                ${param.seriesName}
              </div>
              <strong>${param.value} MB/s</strong>
            </div>
          `;
        });
        
        const total = params.reduce((sum: number, param: any) => sum + param.value, 0);
        tooltip += `
          <div style="border-top: 1px solid ${theme.palette.divider}; margin-top: 8px; padding-top: 4px;">
            <div style="display: flex; justify-content: space-between;">
              <span>Total:</span>
              <strong>${total.toFixed(1)} MB/s</strong>
            </div>
          </div>
        `;
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
      bottom: '15%',
      top: '20%',
      containLabel: true,
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        type: 'slider',
        start: 0,
        end: 100,
        height: 20,
        bottom: 10,
        borderColor: theme.palette.divider,
        fillerColor: theme.palette.primary.main + '30',
        handleStyle: {
          color: theme.palette.primary.main,
        },
        textStyle: {
          color: theme.palette.text.secondary,
        },
      },
    ],
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
      axisLabel: {
        formatter: '{value} MB/s',
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
        name: 'Inbound',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        data: data.map(item => item.inbound),
        lineStyle: {
          color: theme.palette.success.main,
          width: 2,
        },
        itemStyle: {
          color: theme.palette.success.main,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: theme.palette.success.main + '30' },
              { offset: 1, color: theme.palette.success.main + '05' }
            ],
          },
        },
      },
      {
        name: 'Outbound',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        data: data.map(item => item.outbound),
        lineStyle: {
          color: theme.palette.warning.main,
          width: 2,
        },
        itemStyle: {
          color: theme.palette.warning.main,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: theme.palette.warning.main + '30' },
              { offset: 1, color: theme.palette.warning.main + '05' }
            ],
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

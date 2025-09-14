import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { echartStyles } from './EChart.styles';

export interface EChartProps {
  option: any;
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
  className?: string;
  onEvents?: Record<string, (params: any) => void>;
  loading?: boolean;
  loadingOption?: any;
}

export const EChart: React.FC<EChartProps> = ({
  option,
  height = 300,
  width = '100%',
  style,
  className,
  onEvents,
  loading = false,
  loadingOption,
}) => {
  const theme = useTheme();

  // Apply theme-based colors to the option
  const themedOption = React.useMemo(() => {
    
    return {
      ...option,
      backgroundColor: 'transparent',
      textStyle: {
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
      },
      grid: {
        ...option.grid,
        borderColor: theme.palette.divider,
      },
      xAxis: Array.isArray(option.xAxis) 
        ? option.xAxis.map((axis: any) => ({
            ...axis,
            axisLine: { ...axis.axisLine, lineStyle: { color: theme.palette.divider } },
            axisTick: { ...axis.axisTick, lineStyle: { color: theme.palette.divider } },
            axisLabel: { ...axis.axisLabel, color: theme.palette.text.secondary },
            splitLine: { ...axis.splitLine, lineStyle: { color: theme.palette.divider } },
          }))
        : option.xAxis ? {
            ...option.xAxis,
            axisLine: { ...option.xAxis.axisLine, lineStyle: { color: theme.palette.divider } },
            axisTick: { ...option.xAxis.axisTick, lineStyle: { color: theme.palette.divider } },
            axisLabel: { ...option.xAxis.axisLabel, color: theme.palette.text.secondary },
            splitLine: { ...option.xAxis.splitLine, lineStyle: { color: theme.palette.divider } },
          } : undefined,
      yAxis: Array.isArray(option.yAxis)
        ? option.yAxis.map((axis: any) => ({
            ...axis,
            axisLine: { ...axis.axisLine, lineStyle: { color: theme.palette.divider } },
            axisTick: { ...axis.axisTick, lineStyle: { color: theme.palette.divider } },
            axisLabel: { ...axis.axisLabel, color: theme.palette.text.secondary },
            splitLine: { ...axis.splitLine, lineStyle: { color: theme.palette.divider } },
          }))
        : option.yAxis ? {
            ...option.yAxis,
            axisLine: { ...option.yAxis.axisLine, lineStyle: { color: theme.palette.divider } },
            axisTick: { ...option.yAxis.axisTick, lineStyle: { color: theme.palette.divider } },
            axisLabel: { ...option.yAxis.axisLabel, color: theme.palette.text.secondary },
            splitLine: { ...option.yAxis.splitLine, lineStyle: { color: theme.palette.divider } },
          } : undefined,
    };
  }, [option, theme]);

  return (
    <Box
      className={className}
      sx={{
        ...echartStyles.container,
        height: typeof height === 'string' ? height : `${height}px`,
        width: typeof width === 'string' ? width : `${width}px`,
        ...style,
      }}
    >
      <ReactECharts
        option={themedOption}
        style={{
          height: '100%',
          width: '100%',
        }}
        onEvents={onEvents}
        showLoading={loading}
        loadingOption={loadingOption}
      />
    </Box>
  );
};

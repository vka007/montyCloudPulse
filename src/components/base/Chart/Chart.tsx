import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import * as Highcharts from 'highcharts';
import { chartStyles } from './Chart.styles';

export interface ChartProps {
  options: Highcharts.Options;
  height?: number | string;
  width?: number | string;
  className?: string;
  callback?: (chart: Highcharts.Chart) => void;
}

export const Chart: React.FC<ChartProps> = ({
  options,
  height = 300,
  width = '100%',
  className,
  callback,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Create the chart
    chartInstanceRef.current = Highcharts.chart(chartRef.current, {
      ...options,
      chart: {
        ...options.chart,
        height: typeof height === 'number' ? height : undefined,
        width: typeof width === 'number' ? width : undefined,
      },
    });

    // Call callback if provided
    if (callback && chartInstanceRef.current) {
      callback(chartInstanceRef.current);
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [options, height, width, callback]);

  // Update chart when options change
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.update(options, true);
    }
  }, [options]);

  return (
    <Box
      ref={chartRef}
      className={className}
      sx={{
        ...chartStyles.container,
        height: typeof height === 'string' ? height : `${height}px`,
        width: typeof width === 'string' ? width : `${width}px`,
      }}
    />
  );
};

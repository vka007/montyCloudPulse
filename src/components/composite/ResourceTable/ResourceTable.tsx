import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Grid,
  InputAdornment,
  Tooltip,
  TableSortLabel,
} from '@mui/material';
import {
  Search,
  Refresh,
  Visibility,
  Settings,
  Cloud,
  Dataset,
  Functions,
  Storage,
  NetworkCheck,
  CloudQueue,
  Api,
  ViewInAr,
} from '@mui/icons-material';
import { Card } from '@/components/base/Card/Card';
import { Chip } from '@/components/base/Chip/Chip';
import { Progress } from '@/components/base/Progress/Progress';
import { EChart } from '@/components/base/EChart/EChart';
import { useEnhancedResourceStore } from '@/store/enhancedResourceStore';
import { FilterOptions, SortOptions } from '@/types/navigation';
import { resourceTableStyles } from './ResourceTable.styles';

const getResourceIcon = (type: string) => {
  const iconMap: Record<string, React.ReactElement> = {
    ec2: <Cloud fontSize="small" />,
    rds: <Dataset fontSize="small" />,
    lambda: <Functions fontSize="small" />,
    s3: <Storage fontSize="small" />,
    loadbalancer: <NetworkCheck fontSize="small" />,
    cloudfront: <CloudQueue fontSize="small" />,
    apigateway: <Api fontSize="small" />,
    ecs: <ViewInAr fontSize="small" />,
  };
  return iconMap[type] || <Cloud fontSize="small" />;
};

const MetricBar: React.FC<{ value: number; max?: number; color?: string }> = ({ 
  value, 
  max = 100, 
  color = 'primary' 
}) => {
  const percentage = Math.min(100, (value / max) * 100);
  const getColor = (): 'success' | 'warning' | 'error' => {
    if (color !== 'primary') return color as any;
    if (percentage > 80) return 'error';
    if (percentage > 60) return 'warning';
    return 'success';
  };

  return (
    <Box sx={resourceTableStyles.metricCell}>
      <Typography variant="body2" sx={resourceTableStyles.metricValue}>
        {value}%
      </Typography>
      <Progress
        type="linear"
        variant="determinate"
        value={percentage}
        color={getColor()}
        size="small"
      />
    </Box>
  );
};

export const ResourceTable: React.FC = () => {
  const { resources, loading, initializeIfNeeded } = useEnhancedResourceStore();
  
  // Initialize data if needed
  React.useEffect(() => {
    initializeIfNeeded();
  }, [initializeIfNeeded]);
  
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: [],
    type: [],
    region: [],
    account: [],
  });

  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'name',
    direction: 'asc',
  });

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const statuses = [...new Set(resources.map(r => r.status))];
    const types = [...new Set(resources.map(r => r.type))];
    const regions = [...new Set(resources.map(r => r.region))];
    const accounts = [...new Set(resources.map(r => r.account))];

    return { statuses, types, regions, accounts };
  }, [resources]);

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    let filtered = resources.filter(resource => {
      // Search filter
      if (filters.search && !resource.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !resource.id.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(resource.status)) {
        return false;
      }

      // Type filter
      if (filters.type.length > 0 && !filters.type.includes(resource.type)) {
        return false;
      }

      // Region filter
      if (filters.region.length > 0 && !filters.region.includes(resource.region)) {
        return false;
      }

      // Account filter
      if (filters.account.length > 0 && !filters.account.includes(resource.account)) {
        return false;
      }

      return true;
    });

    // Sort resources
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortOptions.field) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'type':
          aValue = a.type;
          bValue = b.type;
          break;
        case 'region':
          aValue = a.region;
          bValue = b.region;
          break;
        case 'lastUpdated':
          aValue = new Date(a.lastUpdated).getTime();
          bValue = new Date(b.lastUpdated).getTime();
          break;
        default:
          return 0;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOptions.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOptions.direction === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });

    return filtered;
  }, [resources, filters, sortOptions]);

  const handleSort = (field: string) => {
    setSortOptions(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Summary statistics
  const summaryStats = useMemo(() => {
    const totalCost = Math.round(filteredResources.reduce((sum, resource) => sum + resource.cost.monthly, 0) * 10) / 10;
    const avgCpu = Math.round(filteredResources.reduce((sum, resource) => sum + resource.metrics.cpu.current, 0) / filteredResources.length * 10) / 10;
    const avgMemory = Math.round(filteredResources.reduce((sum, resource) => sum + resource.metrics.memory.percentage, 0) / filteredResources.length * 10) / 10;
    
    return {
      total: filteredResources.length,
      running: filteredResources.filter(r => r.status === 'running').length,
      warning: filteredResources.filter(r => r.status === 'warning').length,
      error: filteredResources.filter(r => r.status === 'error').length,
      totalCost,
      avgCpu,
      avgMemory,
    };
  }, [filteredResources]);

  return (
    <Box sx={resourceTableStyles.container}>
      {/* Beautiful SaaS-Style 5-Card Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* 1. Total Resources Card */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            height: 160, 
            background: 'white',
            color: 'text.primary',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 3,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', pr: 2 }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, mb: 1 }}>
                  {summaryStats.total}
                </Typography>
                <Typography sx={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>
                  Total Resources
                </Typography>
              </Box>
              <Box sx={{ width: 250, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <EChart
                  option={{
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b}: {c} ({d}%)',
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      textStyle: { color: '#fff' }
                    },
                    series: [{
                      type: 'pie',
                      radius: [0, '70%'],
                      center: ['50%', '50%'],
                      roseType: 'area',
                      data: [
                        { value: summaryStats.running, name: 'Running', itemStyle: { color: '#4caf50' } },
                        { value: summaryStats.warning, name: 'Warning', itemStyle: { color: '#ff9800' } },
                        { value: summaryStats.error, name: 'Error', itemStyle: { color: '#f44336' } },
                        { value: summaryStats.total - summaryStats.running - summaryStats.warning - summaryStats.error, name: 'Stopped', itemStyle: { color: '#9e9e9e' } }
                      ],
                      label: { show: false },
                      labelLine: { show: false },
                      emphasis: { 
                        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
                      }
                    }]
                  }}
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* 2. Resource Status Card */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            height: 160, 
            background: 'white',
            color: 'text.primary',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 3,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', pr: 2 }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, mb: 1 }}>
                  {summaryStats.running + summaryStats.warning + summaryStats.error}
                </Typography>
                <Typography sx={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>
                  Active Resources
                </Typography>
              </Box>
              <Box sx={{ width: 250, height: 123, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <EChart
                  option={{
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b}: {c} ({d}%)',
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      textStyle: { color: '#fff' }
                    },
                    series: [{
                      type: 'pie',
                      radius: ['30%', '60%'],
                      center: ['50%', '50%'],
                      data: [
                        { value: resources.filter(r => r.type === 'ec2').length, name: 'EC2', itemStyle: { color: '#1976d2' } },
                        { value: resources.filter(r => r.type === 'rds').length, name: 'RDS', itemStyle: { color: '#4caf50' } },
                        { value: resources.filter(r => r.type === 'lambda').length, name: 'Lambda', itemStyle: { color: '#ff9800' } },
                        { value: resources.filter(r => r.type === 's3').length, name: 'S3', itemStyle: { color: '#f44336' } },
                        { value: resources.filter(r => r.type === 'loadbalancer').length, name: 'LB', itemStyle: { color: '#9c27b0' } },
                        { value: resources.filter(r => r.type === 'cloudfront').length, name: 'CF', itemStyle: { color: '#00bcd4' } },
                        { value: resources.filter(r => r.type === 'apigateway').length, name: 'API', itemStyle: { color: '#795548' } },
                        { value: resources.filter(r => r.type === 'ecs').length, name: 'ECS', itemStyle: { color: '#607d8b' } }
                      ],
                      label: { show: false },
                      labelLine: { show: false },
                      emphasis: { 
                        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
                      }
                    }]
                  }}
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* 3. Average CPU Usage Card */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            height: 160, 
            background: 'white',
            color: 'text.primary',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 3,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', pr: 2 }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, mb: 1 }}>
                  {summaryStats.avgCpu}%
                </Typography>
                <Typography sx={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>
                  Avg CPU Usage
                </Typography>
              </Box>
              <Box sx={{ width: 200, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <EChart
                  option={{
                    tooltip: {
                      trigger: 'item',
                      formatter: `CPU Usage: ${summaryStats.avgCpu}% (${summaryStats.avgCpu > 80 ? 'High' : summaryStats.avgCpu > 60 ? 'Medium' : 'Low'} Load)`,
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      textStyle: { color: '#fff' }
                    },
                    series: [{
                      type: 'gauge',
                      radius: '70%',
                      center: ['50%', '50%'],
                      min: 0,
                      max: 100,
                      data: [{ value: summaryStats.avgCpu, name: 'CPU' }],
                      axisLine: {
                        lineStyle: {
                          width: 8,
                          color: [
                            [0.2, '#e0e0e0'],
                            [0.4, '#4caf50'],
                            [0.6, '#ff9800'],
                            [0.8, '#ff5722'],
                            [1, '#f44336']
                          ]
                        }
                      },
                      pointer: { 
                        show: true,
                        length: '60%',
                        width: 3,
                        itemStyle: { color: '#1976d2' }
                      },
                      axisTick: { show: false },
                      splitLine: { 
                        show: true,
                        length: 8,
                        lineStyle: { color: '#e0e0e0', width: 1 }
                      },
                      axisLabel: { show: false },
                      detail: { 
                        show: true,
                        fontSize: 12,
                        color: '#1976d2',
                        formatter: '{value}%',
                        offsetCenter: [0, '70%']
                      },
                      emphasis: { 
                        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
                      }
                    }]
                  }}
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* 4. Average Memory Usage Card */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            height: 160, 
            background: 'white',
            color: 'text.primary',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 3,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', pr: 2 }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, mb: 1 }}>
                  {summaryStats.avgMemory}%
                </Typography>
                <Typography sx={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>
                  Avg Memory Usage
                </Typography>
              </Box>
              <Box sx={{ width: 190, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <EChart
                  option={{
                    tooltip: {
                      trigger: 'item',
                      formatter: `Memory Usage: ${summaryStats.avgMemory}% (${summaryStats.avgMemory > 80 ? 'High' : summaryStats.avgMemory > 60 ? 'Medium' : 'Low'} Usage)`,
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      textStyle: { color: '#fff' }
                    },
                    series: [{
                      type: 'gauge',
                      radius: '70%',
                      center: ['50%', '50%'],
                      min: 0,
                      max: 100,
                      data: [{ value: summaryStats.avgMemory, name: 'Memory' }],
                      axisLine: {
                        lineStyle: {
                          width: 8,
                          color: [
                            [0.2, '#e0e0e0'],
                            [0.4, '#4caf50'],
                            [0.6, '#ff9800'],
                            [0.8, '#ff5722'],
                            [1, '#f44336']
                          ]
                        }
                      },
                      pointer: { 
                        show: true,
                        length: '60%',
                        width: 3,
                        itemStyle: { color: '#ff9800' }
                      },
                      axisTick: { show: false },
                      splitLine: { 
                        show: true,
                        length: 8,
                        lineStyle: { color: '#e0e0e0', width: 1 }
                      },
                      axisLabel: { show: false },
                      detail: { 
                        show: true,
                        fontSize: 12,
                        color: '#ff9800',
                        formatter: '{value}%',
                        offsetCenter: [0, '70%']
                      },
                      emphasis: { 
                        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
                      }
                    }]
                  }}
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* 5. Total Monthly Cost Card */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            height: 160, 
            background: 'white',
            color: 'text.primary',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 3,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', pr: 2 }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, mb: 1 }}>
                  ${summaryStats.totalCost}
                </Typography>
                <Typography sx={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>
                  Monthly Cost
                </Typography>
              </Box>
              <Box sx={{ width: 135, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <EChart
                  option={{
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b}: ${c} ({d}%)',
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      textStyle: { color: '#fff' }
                    },
                    series: [{
                      type: 'pie',
                      radius: ['40%', '70%'],
                      center: ['50%', '50%'],
                      data: [
                        { value: Math.round(resources.filter(r => r.type === 'ec2').reduce((sum, r) => sum + r.cost.monthly, 0) * 10) / 10, name: 'EC2', itemStyle: { color: '#1976d2' } },
                        { value: Math.round(resources.filter(r => r.type === 'rds').reduce((sum, r) => sum + r.cost.monthly, 0) * 10) / 10, name: 'RDS', itemStyle: { color: '#4caf50' } },
                        { value: Math.round(resources.filter(r => r.type === 'lambda').reduce((sum, r) => sum + r.cost.monthly, 0) * 10) / 10, name: 'Lambda', itemStyle: { color: '#ff9800' } },
                        { value: Math.round(resources.filter(r => r.type === 's3').reduce((sum, r) => sum + r.cost.monthly, 0) * 10) / 10, name: 'S3', itemStyle: { color: '#f44336' } },
                        { value: Math.round(resources.filter(r => r.type === 'loadbalancer').reduce((sum, r) => sum + r.cost.monthly, 0) * 10) / 10, name: 'LB', itemStyle: { color: '#9c27b0' } },
                        { value: Math.round(resources.filter(r => r.type === 'cloudfront').reduce((sum, r) => sum + r.cost.monthly, 0) * 10) / 10, name: 'CF', itemStyle: { color: '#00bcd4' } },
                        { value: Math.round(resources.filter(r => r.type === 'apigateway').reduce((sum, r) => sum + r.cost.monthly, 0) * 10) / 10, name: 'API', itemStyle: { color: '#795548' } },
                        { value: Math.round(resources.filter(r => r.type === 'ecs').reduce((sum, r) => sum + r.cost.monthly, 0) * 10) / 10, name: 'ECS', itemStyle: { color: '#607d8b' } }
                      ],
                      label: { show: false },
                      labelLine: { show: false },
                      emphasis: { 
                        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
                      }
                    }]
                  }}
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Box sx={resourceTableStyles.searchContainer}>
        <TextField
          sx={resourceTableStyles.searchField}
          placeholder="Search resources by name or ID..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={resourceTableStyles.filterContainer}>
          <FormControl sx={resourceTableStyles.filterSelect}>
            <InputLabel>Status</InputLabel>
            <Select
              multiple
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              label="Status"
            >
              {filterOptions.statuses.map(status => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={resourceTableStyles.filterSelect}>
            <InputLabel>Type</InputLabel>
            <Select
              multiple
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              label="Type"
            >
              {filterOptions.types.map(type => (
                <MenuItem key={type} value={type}>
                  {type.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={resourceTableStyles.filterSelect}>
            <InputLabel>Region</InputLabel>
            <Select
              multiple
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              label="Region"
            >
              {filterOptions.regions.map(region => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={resourceTableStyles.filterSelect}>
            <InputLabel>Account</InputLabel>
            <Select
              multiple
              value={filters.account}
              onChange={(e) => handleFilterChange('account', e.target.value)}
              label="Account"
            >
              {filterOptions.accounts.map(account => (
                <MenuItem key={account} value={account}>
                  {account}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Tooltip title="Refresh Data">
            <IconButton onClick={initializeIfNeeded} disabled={loading}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Resource Table */}
      <TableContainer component={Paper} sx={resourceTableStyles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortOptions.field === 'name'}
                  direction={sortOptions.field === 'name' ? sortOptions.direction : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Resource
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOptions.field === 'type'}
                  direction={sortOptions.field === 'type' ? sortOptions.direction : 'asc'}
                  onClick={() => handleSort('type')}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOptions.field === 'region'}
                  direction={sortOptions.field === 'region' ? sortOptions.direction : 'asc'}
                  onClick={() => handleSort('region')}
                >
                  Region
                </TableSortLabel>
              </TableCell>
              <TableCell>CPU</TableCell>
              <TableCell>Memory</TableCell>
              <TableCell>Network</TableCell>
              <TableCell>Monthly Cost</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOptions.field === 'lastUpdated'}
                  direction={sortOptions.field === 'lastUpdated' ? sortOptions.direction : 'asc'}
                  onClick={() => handleSort('lastUpdated')}
                >
                  Last Updated
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResources.map((resource) => (
              <TableRow key={resource.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getResourceIcon(resource.type)}
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {resource.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {resource.id}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={resource.status}
                    status={resource.status}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {resource.type.toUpperCase()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {resource.region}
                  </Typography>
                </TableCell>
                <TableCell>
                  <MetricBar value={resource.metrics.cpu.current} />
                </TableCell>
                <TableCell>
                  <MetricBar value={resource.metrics.memory.percentage} />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {Math.round((resource.metrics.network.inbound + resource.metrics.network.outbound) * 10) / 10} MB/s
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="primary.main" fontWeight={500}>
                    ${Math.round(resource.cost.monthly * 10) / 10}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(resource.lastUpdated).toLocaleTimeString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="View Details">
                      <IconButton size="small" sx={resourceTableStyles.actionButton}>
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Settings">
                      <IconButton size="small" sx={resourceTableStyles.actionButton}>
                        <Settings fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredResources.length === 0 && !loading && (
        <Box sx={resourceTableStyles.emptyState}>
          <Typography variant="h6" color="text.secondary">
            No resources found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Box>
      )}
    </Box>
  );
};

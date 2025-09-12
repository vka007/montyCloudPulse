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
  Chip,
  LinearProgress,
  IconButton,
  Typography,
  Grid,
  Card,
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
import { useResourceStore } from '@/store/resourceStore';
import { ResourceType, ResourceStatus } from '@/types/resources';
import { FilterOptions, SortOptions } from '@/types/navigation';
import { resourceTableStyles } from './ResourceTable.styles';

const getResourceIcon = (type: ResourceType) => {
  const iconMap = {
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

const getStatusColor = (status: ResourceStatus): 'success' | 'warning' | 'error' | 'default' | 'secondary' => {
  switch (status) {
    case 'running': return 'success';
    case 'warning': return 'warning';
    case 'error': return 'error';
    case 'stopped': return 'secondary';
    case 'pending': return 'default';
    case 'terminated': return 'error';
    default: return 'default';
  }
};

const MetricBar: React.FC<{ value: number; max?: number; color?: string }> = ({ 
  value, 
  max = 100, 
  color = 'primary' 
}) => {
  const percentage = Math.min(100, (value / max) * 100);
  const getColor = () => {
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
      <LinearProgress
        variant="determinate"
        value={percentage}
        color={getColor()}
        sx={resourceTableStyles.metricBar}
      />
    </Box>
  );
};

export const ResourceTable: React.FC = () => {
  const { resources, loading, refreshData } = useResourceStore();
  
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
          aValue = a.lastUpdated.getTime();
          bValue = b.lastUpdated.getTime();
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
    return {
      total: filteredResources.length,
      running: filteredResources.filter(r => r.status === 'running').length,
      warning: filteredResources.filter(r => r.status === 'warning').length,
      error: filteredResources.filter(r => r.status === 'error').length,
    };
  }, [filteredResources]);

  return (
    <Box sx={resourceTableStyles.container}>
      {/* Summary Cards */}
      <Grid container spacing={2} sx={resourceTableStyles.summaryCards}>
        <Grid item xs={6} sm={3}>
          <Card sx={resourceTableStyles.summaryCard}>
            <Typography sx={resourceTableStyles.summaryValue} color="primary">
              {summaryStats.total}
            </Typography>
            <Typography sx={resourceTableStyles.summaryLabel}>
              Total Resources
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={resourceTableStyles.summaryCard}>
            <Typography sx={resourceTableStyles.summaryValue} color="success.main">
              {summaryStats.running}
            </Typography>
            <Typography sx={resourceTableStyles.summaryLabel}>
              Running
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={resourceTableStyles.summaryCard}>
            <Typography sx={resourceTableStyles.summaryValue} color="warning.main">
              {summaryStats.warning}
            </Typography>
            <Typography sx={resourceTableStyles.summaryLabel}>
              Warning
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={resourceTableStyles.summaryCard}>
            <Typography sx={resourceTableStyles.summaryValue} color="error.main">
              {summaryStats.error}
            </Typography>
            <Typography sx={resourceTableStyles.summaryLabel}>
              Error
            </Typography>
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

          <Tooltip title="Refresh Data">
            <IconButton onClick={refreshData} disabled={loading}>
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
                    color={getStatusColor(resource.status)}
                    size="small"
                    sx={resourceTableStyles.statusChip}
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
                    {Math.round((resource.metrics.network.inbound + resource.metrics.network.outbound) / 1024)} MB/s
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {resource.lastUpdated.toLocaleTimeString()}
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

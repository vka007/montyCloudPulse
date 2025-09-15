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
  Typography,
  Grid,
  InputAdornment,
  TableSortLabel,
} from '@mui/material';
import {
  Search,
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


export const ResourceTable: React.FC = () => {
  const { 
    resources, 
    loading, 
    initializeIfNeeded,
    isRealTimeActive,
    startRealTimeUpdates,
    stopRealTimeUpdates
  } = useEnhancedResourceStore();
  
  // Use ref to track initialization to prevent infinite loops
  const hasInitialized = React.useRef(false);
  
  // Initialize data and start real-time updates
  React.useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      
      // Initialize data if needed
      initializeIfNeeded();
      
      // Start real-time updates after a short delay to ensure data is loaded
      setTimeout(() => {
        if (!isRealTimeActive) {
          startRealTimeUpdates();
        }
      }, 1000);
    }
    
    // Cleanup on unmount
    return () => {
      stopRealTimeUpdates();
    };
  }, []); // Empty dependency array - only run once on mount
  
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
            background: 'background.paper',
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
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, mb: 1 }}>
                {summaryStats.total}
              </Typography>
              <Typography sx={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>
                Total Resources
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* 2. Resource Status Card */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            height: 160, 
            background: 'background.paper',
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
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, mb: 1 }}>
                {summaryStats.running + summaryStats.warning + summaryStats.error}
              </Typography>
              <Typography sx={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>
                Active Resources
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* 3. Average CPU Usage Card */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            height: 160, 
            background: 'background.paper',
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
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ 
                fontSize: '3.5rem', 
                fontWeight: 800, 
                lineHeight: 1, 
                mb: 1,
                color: summaryStats.avgCpu < 35 ? 'success.main' : 
                       summaryStats.avgCpu < 70 ? 'warning.main' : 'error.main'
              }}>
                {summaryStats.avgCpu}%
              </Typography>
              <Typography sx={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>
                Avg CPU Usage
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* 4. Average Memory Usage Card */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            height: 160, 
            background: 'background.paper',
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
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ 
                fontSize: '3.5rem', 
                fontWeight: 800, 
                lineHeight: 1, 
                mb: 1,
                color: summaryStats.avgMemory < 35 ? 'success.main' : 
                       summaryStats.avgMemory < 70 ? 'warning.main' : 'error.main'
              }}>
                {summaryStats.avgMemory}%
              </Typography>
              <Typography sx={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>
                Avg Memory Usage
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* 5. Total Monthly Cost Card */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            height: 160, 
            background: 'background.paper',
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
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ 
                fontSize: '3.5rem', 
                fontWeight: 800, 
                lineHeight: 1, 
                mb: 1,
                color: 'primary.main'
              }}>
                ${summaryStats.totalCost}
              </Typography>
              <Typography sx={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>
                Monthly Cost
              </Typography>
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
        </Box>
      </Box>

      {/* Resource Table */}
      <TableContainer component={Paper} sx={resourceTableStyles.tableContainer}>
        <Table>
          <TableHead sx={resourceTableStyles.tableHeader}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', width: '200px', maxWidth: '200px' }}>
                <TableSortLabel
                  active={sortOptions.field === 'name'}
                  direction={sortOptions.field === 'name' ? sortOptions.direction : 'asc'}
                  onClick={() => handleSort('name')}
                  sx={{ fontWeight: 700, fontSize: '0.875rem' }}
                >
                  Resource
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', width: '100px', maxWidth: '100px' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', width: '80px', maxWidth: '80px' }}>
                <TableSortLabel
                  active={sortOptions.field === 'type'}
                  direction={sortOptions.field === 'type' ? sortOptions.direction : 'asc'}
                  onClick={() => handleSort('type')}
                  sx={{ fontWeight: 700, fontSize: '0.875rem' }}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', width: '120px', maxWidth: '120px' }}>
                <TableSortLabel
                  active={sortOptions.field === 'region'}
                  direction={sortOptions.field === 'region' ? sortOptions.direction : 'asc'}
                  onClick={() => handleSort('region')}
                  sx={{ fontWeight: 700, fontSize: '0.875rem' }}
                >
                  Region
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', width: '180px', maxWidth: '180px' }}>CPU</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', width: '180px', maxWidth: '180px' }}>Memory</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', width: '120px', maxWidth: '120px' }}>Network</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', width: '120px', maxWidth: '120px' }}>Monthly Cost</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', width: '120px', maxWidth: '120px' }}>
                <TableSortLabel
                  active={sortOptions.field === 'lastUpdated'}
                  direction={sortOptions.field === 'lastUpdated' ? sortOptions.direction : 'asc'}
                  onClick={() => handleSort('lastUpdated')}
                  sx={{ fontWeight: 700, fontSize: '0.875rem' }}
                >
                  Last Updated
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResources.map((resource) => (
              <TableRow key={resource.id} hover sx={resourceTableStyles.tableRow}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getResourceIcon(resource.type)}
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.875rem' }}>
                        {resource.name}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.primary', fontSize: '0.75rem' }}>
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
                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.875rem' }}>
                    {resource.type.toUpperCase()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.875rem' }}>
                    {resource.region}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                    <Typography 
                      variant="body2" 
                      fontWeight={600} 
                      sx={{ 
                        fontSize: '0.875rem', 
                        minWidth: 35,
                        color: resource.metrics.cpu.current < 35 ? 'success.main' : 
                               resource.metrics.cpu.current < 70 ? 'warning.main' : 'error.main'
                      }}
                    >
                      {resource.metrics.cpu.current}%
                    </Typography>
                    <Box sx={{ flex: 1, height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
                      <Box 
                        sx={{ 
                          height: '100%', 
                          width: `${resource.metrics.cpu.current}%`,
                          backgroundColor: resource.metrics.cpu.current < 35 ? 'success.main' : 
                                         resource.metrics.cpu.current < 70 ? 'warning.main' : 'error.main',
                          borderRadius: 4,
                          transition: 'width 0.3s ease'
                        }} 
                      />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                    <Typography 
                      variant="body2" 
                      fontWeight={600} 
                      sx={{ 
                        fontSize: '0.875rem', 
                        minWidth: 35,
                        color: resource.metrics.memory.percentage < 35 ? 'success.main' : 
                               resource.metrics.memory.percentage < 70 ? 'warning.main' : 'error.main'
                      }}
                    >
                      {resource.metrics.memory.percentage}%
                    </Typography>
                    <Box sx={{ flex: 1, height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
                      <Box 
                        sx={{ 
                          height: '100%', 
                          width: `${resource.metrics.memory.percentage}%`,
                          backgroundColor: resource.metrics.memory.percentage < 35 ? 'success.main' : 
                                         resource.metrics.memory.percentage < 70 ? 'warning.main' : 'error.main',
                          borderRadius: 4,
                          transition: 'width 0.3s ease'
                        }} 
                      />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.875rem' }}>
                    {Math.round((resource.metrics.network.inbound + resource.metrics.network.outbound) * 10) / 10} MB/s
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="primary.main" fontWeight={700} sx={{ fontSize: '0.875rem' }}>
                    ${Math.round(resource.cost.monthly * 10) / 10}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.875rem', color: 'text.primary' }}>
                    {new Date(resource.lastUpdated).toLocaleTimeString()}
                  </Typography>
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

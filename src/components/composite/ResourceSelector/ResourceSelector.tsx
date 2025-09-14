import React from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Typography,
  Paper,
} from '@mui/material';
import {
  Cloud,
  Dataset,
  Functions,
  Storage,
  NetworkCheck,
  CloudQueue,
  Api,
  ViewInAr,
} from '@mui/icons-material';
import { resourceSelectorStyles } from './ResourceSelector.styles';

interface ResourceSelectorProps {
  selectedResource: string;
  selectedResourceType: string;
  selectedRegion: string;
  selectedAccount: string;
  onResourceChange: (resourceId: string) => void;
  onResourceTypeChange: (type: string) => void;
  onRegionChange: (region: string) => void;
  onAccountChange: (account: string) => void;
  resources: Array<{
    id: string;
    name: string;
    type: string;
    region: string;
    account: string;
    instanceType?: string;
    status: string;
  }>;
  regions: string[];
  accounts: string[];
  resourceTypes: string[];
}

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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'running': return 'success';
    case 'warning': return 'warning';
    case 'error': return 'error';
    case 'stopped': return 'default';
    case 'pending': return 'info';
    default: return 'default';
  }
};

export const ResourceSelector: React.FC<ResourceSelectorProps> = ({
  selectedResource,
  selectedResourceType,
  selectedRegion,
  selectedAccount,
  onResourceChange,
  onResourceTypeChange,
  onRegionChange,
  onAccountChange: _onAccountChange,
  resources,
  regions,
  accounts: _accounts,
  resourceTypes,
}) => {
  const filteredResources = resources.filter(resource => {
    return (
      (selectedResourceType === 'all' || resource.type === selectedResourceType) &&
      (selectedRegion === 'all' || resource.region === selectedRegion) &&
      (selectedAccount === 'all' || resource.account === selectedAccount)
    );
  });

  const selectedResourceData = resources.find(r => r.id === selectedResource);

  return (
    <Paper elevation={2} sx={resourceSelectorStyles.container}>
      <Box sx={resourceSelectorStyles.header}>
        <Typography variant="h6" sx={resourceSelectorStyles.title}>
          Resource Selection
        </Typography>
        <Typography variant="body2" sx={resourceSelectorStyles.subtitle}>
          Select specific resources to view detailed metrics and costs
        </Typography>
      </Box>

      <Box sx={resourceSelectorStyles.filtersContainer}>
        {/* Region Filter */}
        <Box sx={resourceSelectorStyles.filterGroup}>
          <Typography variant="subtitle2" sx={resourceSelectorStyles.filterLabel}>
            Region
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={selectedRegion}
              onChange={(e) => onRegionChange(e.target.value)}
              sx={resourceSelectorStyles.select}
              displayEmpty
            >
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Resource Type Filter */}
        <Box sx={resourceSelectorStyles.filterGroup}>
          <Typography variant="subtitle2" sx={resourceSelectorStyles.filterLabel}>
            Resource Type
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={selectedResourceType}
              onChange={(e) => onResourceTypeChange(e.target.value)}
              sx={resourceSelectorStyles.select}
              displayEmpty
            >
              <MenuItem value="all">
                <Box sx={resourceSelectorStyles.menuItem}>
                  <Cloud fontSize="small" />
                  All Types
                </Box>
              </MenuItem>
              {resourceTypes.filter(type => type !== 'all').map((type) => (
                <MenuItem key={type} value={type}>
                  <Box sx={resourceSelectorStyles.menuItem}>
                    {getResourceIcon(type)}
                    {type.toUpperCase()}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Specific Resource */}
        <Box sx={resourceSelectorStyles.filterGroup}>
          <Typography variant="subtitle2" sx={resourceSelectorStyles.filterLabel}>
            Specific Resource
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={selectedResource}
              onChange={(e) => onResourceChange(e.target.value)}
              sx={resourceSelectorStyles.select}
              displayEmpty
            >
              <MenuItem value="all">All Resources</MenuItem>
              {filteredResources.map((resource) => (
                <MenuItem key={resource.id} value={resource.id}>
                  <Box sx={resourceSelectorStyles.resourceMenuItem}>
                    {getResourceIcon(resource.type)}
                    <Box sx={resourceSelectorStyles.resourceInfo}>
                      <Typography variant="body2" sx={resourceSelectorStyles.resourceName}>
                        {resource.name}
                      </Typography>
                      <Typography variant="caption" sx={resourceSelectorStyles.resourceDetails}>
                        {resource.type.toUpperCase()} • {resource.region}
                        {resource.instanceType && ` • ${resource.instanceType}`}
                      </Typography>
                    </Box>
                    <Chip
                      label={resource.status}
                      size="small"
                      color={getStatusColor(resource.status) as any}
                      sx={resourceSelectorStyles.statusChip}
                    />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Selected Resource Summary */}
      {selectedResourceData && selectedResource !== 'all' && (
        <Box sx={resourceSelectorStyles.selectedResourceSummary}>
          <Typography variant="subtitle1" sx={resourceSelectorStyles.summaryTitle}>
            Selected Resource Details
          </Typography>
          <Box sx={resourceSelectorStyles.summaryContent}>
            <Box sx={resourceSelectorStyles.summaryItem}>
              {getResourceIcon(selectedResourceData.type)}
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {selectedResourceData.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedResourceData.type.toUpperCase()}
                  {selectedResourceData.instanceType && ` (${selectedResourceData.instanceType})`}
                </Typography>
              </Box>
            </Box>
            <Box sx={resourceSelectorStyles.summaryItem}>
              <Typography variant="caption" color="text.secondary">Region:</Typography>
              <Typography variant="body2">{selectedResourceData.region}</Typography>
            </Box>
            <Box sx={resourceSelectorStyles.summaryItem}>
              <Typography variant="caption" color="text.secondary">Account:</Typography>
              <Typography variant="body2">{selectedResourceData.account}</Typography>
            </Box>
            <Box sx={resourceSelectorStyles.summaryItem}>
              <Typography variant="caption" color="text.secondary">Status:</Typography>
              <Chip
                label={selectedResourceData.status}
                size="small"
                color={getStatusColor(selectedResourceData.status) as any}
                sx={resourceSelectorStyles.statusChip}
              />
            </Box>
          </Box>
        </Box>
      )}

      {/* Filter Summary */}
      <Box sx={resourceSelectorStyles.filterSummary}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} 
          {selectedResourceType !== 'all' && ` of type ${selectedResourceType.toUpperCase()}`}
          {selectedRegion !== 'all' && ` in ${selectedRegion}`}
          {selectedAccount !== 'all' && ` from ${selectedAccount}`}
        </Typography>
      </Box>
    </Paper>
  );
};

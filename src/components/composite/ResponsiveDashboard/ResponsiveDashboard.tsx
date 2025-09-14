import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  LinearProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  Dashboard as DashboardIcon,
  Storage as StorageIcon,
  NetworkCheck as NetworkIcon,
} from '@mui/icons-material';
import { 
  CPUTrendChart, 
  MemoryChart, 
  NetworkTrafficChart,
} from '@/components/base/Charts';
import { ResourceSelector } from '@/components/composite/ResourceSelector/ResourceSelector';
import { DynamicMetrics } from '@/components/composite/DynamicMetrics/DynamicMetrics';
import { useEnhancedResourceStore } from '@/store/enhancedResourceStore';
import { 
  getAvailableRegions,
  getAvailableAccounts,
  getAvailableResourceTypes,
} from '@/data/enhancedMockData';
import { responsiveDashboardStyles } from './ResponsiveDashboard.styles';
import { NotificationService } from '@/services/notificationService';
import { useNotificationStore } from '@/store/notificationStore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export const ResponsiveDashboard: React.FC = () => {
  const { 
    resources, 
    loading, 
    initializeIfNeeded,
    isRealTimeActive, 
    startRealTimeUpdates, 
    stopRealTimeUpdates 
  } = useEnhancedResourceStore();
  
  const [tabValue, setTabValue] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [shownNotifications, setShownNotifications] = useState<Set<string>>(new Set());
  const { enqueueSnackbar } = useSnackbar();
  const notificationService = NotificationService.getInstance();
  
  // Resource selection state
  const [selectedResource, setSelectedResource] = useState<string>('all');
  const [selectedResourceType, setSelectedResourceType] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedAccount, setSelectedAccount] = useState<string>('all');

  // Use ref to track initialization to prevent infinite loops
  const hasInitialized = React.useRef(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };



  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // Filter resources based on selections
  const filteredResources = React.useMemo(() => {
    let filteredList = resources;
    
    if (selectedResourceType !== 'all') {
      filteredList = filteredList.filter(r => r.type === selectedResourceType);
    }
    if (selectedRegion !== 'all') {
      filteredList = filteredList.filter(r => r.region === selectedRegion);
    }
    if (selectedAccount !== 'all') {
      filteredList = filteredList.filter(r => r.account === selectedAccount);
    }
    
    return filteredList;
  }, [resources, selectedResourceType, selectedRegion, selectedAccount]);

  const selectedResourcesForMetrics = React.useMemo(() => {
    if (selectedResource === 'all') {
      return filteredResources;
    }
    const resource = filteredResources.find(r => r.id === selectedResource);
    return resource ? [resource] : [];
  }, [selectedResource, filteredResources]);

  // Available options for dropdowns (memoized to prevent re-renders)
  const availableRegions = React.useMemo(() => getAvailableRegions(), []);
  const availableAccounts = React.useMemo(() => getAvailableAccounts(), []);
  const availableResourceTypes = React.useMemo(() => getAvailableResourceTypes(), []);

  // Memoized resources for ResourceSelector to prevent infinite re-renders
  const resourceSelectorData = React.useMemo(() => 
    resources.map(r => ({
      id: r.id,
      name: r.name,
      type: r.type,
      region: r.region,
      account: r.account,
      instanceType: r.instanceType,
      status: r.status,
    })), [resources]);

  // Initialize data and start real-time updates on component mount
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
      notificationService.stopSimulation();
    };
  }, []); // Empty dependency array - only run once on mount

  // Start notification simulation when resources are available (only once)
  React.useEffect(() => {
    if (resources.length > 0) {
      // Stop any existing simulation first
      notificationService.stopSimulation();
      
      // Clear any existing notifications to start fresh
      useNotificationStore.getState().clearAllNotifications();
      
      // Start the notification simulation (this will generate the first notification after 20-25 seconds)
      notificationService.startSimulation(resources);
      
      // DO NOT check for immediate spikes - let notifications start from zero
    }
    
    return () => {
      notificationService.stopSimulation();
    };
  }, [resources.length]); // Only depend on resources.length, not the entire resources array

  // Listen for new notifications and show snackbar alerts
  React.useEffect(() => {
    const unsubscribe = useNotificationStore.subscribe((state: any) => {
      const latestNotification = state.notifications[0];
      if (latestNotification && 
          !latestNotification.read && 
          !shownNotifications.has(latestNotification.id)) {
        
        // Mark this notification as shown
        setShownNotifications(prev => new Set(prev).add(latestNotification.id));
        
        // Show snackbar notification
        const severity = latestNotification.severity === 'critical' ? 'error' : 
                        latestNotification.severity === 'high' ? 'warning' : 'info';
        
        enqueueSnackbar(latestNotification.message, {
          variant: severity,
          autoHideDuration: 5000,
        });
      }
    });

    return unsubscribe;
  }, [enqueueSnackbar]); // Remove shownNotifications from dependencies to prevent recreation

  return (
    <Box sx={responsiveDashboardStyles.dashboardLayout}>
      {/* Left Sidebar - Resource Filter */}
      <Box sx={responsiveDashboardStyles.leftSidebar}>
        <ResourceSelector
          selectedResource={selectedResource}
          selectedResourceType={selectedResourceType}
          selectedRegion={selectedRegion}
          selectedAccount={selectedAccount}
          onResourceChange={setSelectedResource}
          onResourceTypeChange={setSelectedResourceType}
          onRegionChange={setSelectedRegion}
          onAccountChange={setSelectedAccount}
          resources={resourceSelectorData}
          regions={availableRegions}
          accounts={availableAccounts}
          resourceTypes={availableResourceTypes}
        />
      </Box>

      {/* Main Content Area */}
      <Box sx={responsiveDashboardStyles.mainContent}>
        {/* Loading Progress */}
        {loading && (
          <Box sx={responsiveDashboardStyles.loadingBar}>
            <LinearProgress />
          </Box>
        )}

        {/* Simple Tabs Header */}
        <Box sx={responsiveDashboardStyles.tabsContainer}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="dashboard tabs"
            sx={responsiveDashboardStyles.tabs}
          >
            <Tab
              icon={<DashboardIcon />}
              label="Overview"
              iconPosition="start"
              sx={responsiveDashboardStyles.tab}
            />
            <Tab
              icon={<StorageIcon />}
              label="Compute"
              iconPosition="start"
              sx={responsiveDashboardStyles.tab}
            />
            <Tab
              icon={<NetworkIcon />}
              label="Network"
              iconPosition="start"
              sx={responsiveDashboardStyles.tab}
            />
          </Tabs>
          
        </Box>

        {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        {/* Overview Dashboard with Dynamic Metrics */}
        <DynamicMetrics
          selectedResources={selectedResourcesForMetrics}
          isAllResources={selectedResource === 'all' && selectedResourceType === 'all' && selectedRegion === 'all' && selectedAccount === 'all'}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Compute Dashboard */}
        <Grid container spacing={3}>
          {selectedResourcesForMetrics.length > 0 ? (
            selectedResourcesForMetrics.map((resource) => (
              <React.Fragment key={resource.id}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Compute Metrics - {resource.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Paper elevation={2} sx={responsiveDashboardStyles.chartPaper}>
                    <CPUTrendChart 
                      data={resource.metrics.cpu.history.map((value, index) => ({
                        time: `${index}:00`,
                        value: Math.round(value * 10) / 10,
                      }))}
                      title={`CPU Usage - ${resource.name}`} 
                      height={300} 
                    />
                  </Paper>
                </Grid>
                
                <Grid item xs={12} lg={6}>
                  <Paper elevation={2} sx={responsiveDashboardStyles.chartPaper}>
                    <MemoryChart 
                      data={{
                        allocated: resource.metrics.memory.total,
                        used: resource.metrics.memory.current,
                        cached: resource.metrics.memory.total * 0.2,
                        free: resource.metrics.memory.total - resource.metrics.memory.current,
                      }}
                      title={`Memory Usage - ${resource.name}`}
                      height={300} 
                    />
                  </Paper>
                </Grid>
              </React.Fragment>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                No compute resources selected
              </Typography>
            </Grid>
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Network Dashboard */}
        <Grid container spacing={3}>
          {selectedResourcesForMetrics.length > 0 ? (
            selectedResourcesForMetrics.map((resource) => (
              <Grid item xs={12} key={resource.id}>
                <Paper elevation={2} sx={responsiveDashboardStyles.chartPaper}>
                  <NetworkTrafficChart 
                    data={resource.metrics.network.history}
                    title={`Network Traffic - ${resource.name}`}
                    height={400} 
                  />
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                No network resources selected
              </Typography>
            </Grid>
          )}
        </Grid>
      </TabPanel>
      </Box>


      {/* Alert Snackbar */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleAlertClose} severity="success" variant="filled">
          Operation completed successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

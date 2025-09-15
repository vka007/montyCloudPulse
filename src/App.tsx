import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { Notistack } from '@/components/base/Notistack';
import { NotificationProvider } from '@/notification/NotificationProvider';
import { Navigation } from '@/navigation/Navigation';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useTheme } from '@/hooks/useTheme';
import { useEnhancedResourceStore } from '@/store/enhancedResourceStore';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('@/pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Inventory = React.lazy(() => import('@/pages/Inventory').then(module => ({ default: module.Inventory })));

const App: React.FC = () => {
  const { muiTheme } = useTheme();
  const { stopRealTimeUpdates } = useEnhancedResourceStore();

  // Global cleanup when app unmounts
  React.useEffect(() => {
    return () => {
      stopRealTimeUpdates();
    };
  }, [stopRealTimeUpdates]);

  // Loading component for Suspense
  const LoadingFallback = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
      }}
    >
      <CircularProgress />
    </Box>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <Notistack
          position="bottom-left"
          autoHideDuration={5000}
          maxNotifications={3}
        >
          <NotificationProvider>
            <Router>
              <Navigation>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </Suspense>
              </Navigation>
            </Router>
          </NotificationProvider>
        </Notistack>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;

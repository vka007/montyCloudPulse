import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Notistack } from '@/components/base/Notistack';
import { NotificationProvider } from '@/notification/NotificationProvider';
import { Navigation } from '@/navigation/Navigation';
import { Dashboard } from '@/pages/Dashboard';
import { Inventory } from '@/pages/Inventory';
import { useTheme } from '@/hooks/useTheme';

const App: React.FC = () => {
  const { muiTheme } = useTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Notistack
        position="bottom-left"
        autoHideDuration={5000}
        maxNotifications={3}
      >
        <NotificationProvider>
          <Router>
            <Navigation>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Navigation>
          </Router>
        </NotificationProvider>
      </Notistack>
    </ThemeProvider>
  );
};

export default App;

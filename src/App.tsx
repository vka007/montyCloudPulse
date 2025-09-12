import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Dashboard } from '@/pages/Dashboard';
import { useTheme } from '@/hooks/useTheme';

const App: React.FC = () => {
  const { muiTheme } = useTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

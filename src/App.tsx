import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Layout } from '@/components/common/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { useTheme } from '@/hooks/useTheme';

const App: React.FC = () => {
  const { muiTheme } = useTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Layout>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  );
};

export default App;

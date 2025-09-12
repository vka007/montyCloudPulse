import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { dashboardStyles } from './Dashboard.styles';

export const Dashboard: React.FC = () => {
  return (
    <Box sx={dashboardStyles.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cloud Resources Dashboard
      </Typography>
      
      <Paper sx={dashboardStyles.welcomeCard}>
        <Typography variant="h6" sx={dashboardStyles.welcomeTitle}>
          Welcome to MontyCloud Pulse Dashboard
          <br />
          <Typography variant="body2" sx={dashboardStyles.welcomeSubtitle}>
            Your cloud resources monitoring starts here
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

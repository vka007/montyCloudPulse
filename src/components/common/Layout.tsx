import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import { ThemeToggle } from './ThemeToggle';
import { layoutStyles } from './Layout.styles';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={layoutStyles.root}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={layoutStyles.title}>
            MontyCloud Pulse
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={layoutStyles.container}>
        {children}
      </Container>
    </Box>
  );
};

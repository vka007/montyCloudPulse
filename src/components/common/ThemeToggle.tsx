import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
      <IconButton onClick={toggleTheme} color="inherit">
        {isDark ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

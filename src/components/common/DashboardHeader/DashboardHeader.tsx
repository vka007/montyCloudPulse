import React from 'react';
import {
  Box,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Chip,
} from '@mui/material';
import {
  Refresh,
  PlayArrow,
  Pause,
} from '@mui/icons-material';
import { useResourceStore } from '@/store/resourceStore';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  showControls?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  subtitle, 
  showControls = false 
}) => {
  const { loading, refreshData, isRealTimeActive, startRealTimeUpdates, stopRealTimeUpdates } = useResourceStore();

  const handleRealTimeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      startRealTimeUpdates();
    } else {
      stopRealTimeUpdates();
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      width: '100%'
    }}>
      {/* Title and Subtitle */}
      <Box>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'white', 
            fontWeight: 600,
            lineHeight: 1.2,
            mb: 0.5
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.2
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Controls */}
      {showControls && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2 
        }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={refreshData}
            disabled={loading}
            size="small"
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Refresh Data
          </Button>

          <FormControlLabel
            control={
              <Switch
                checked={isRealTimeActive}
                onChange={handleRealTimeToggle}
                size="small"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#4caf50',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#4caf50',
                  },
                }}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ color: 'white', fontWeight: 500 }}
                >
                  Real-time Updates
                </Typography>
                <Chip
                  icon={isRealTimeActive ? <PlayArrow /> : <Pause />}
                  label={isRealTimeActive ? 'LIVE' : 'PAUSED'}
                  size="small"
                  color={isRealTimeActive ? 'success' : 'default'}
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                  }}
                />
              </Box>
            }
            sx={{ ml: 1 }}
          />
        </Box>
      )}
    </Box>
  );
};

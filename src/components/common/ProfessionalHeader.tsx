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

interface ProfessionalHeaderProps {
  title: string;
  subtitle: string;
  showControls?: boolean;
}

export const ProfessionalHeader: React.FC<ProfessionalHeaderProps> = ({ 
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
      {/* Left Section - Title and Subtitle */}
      <Box sx={{ flex: 1 }}>
        <Typography 
          sx={{ 
            fontSize: '1.30rem',
            fontWeight: 700,
            color: 'text.primary',
            lineHeight: 1.2,
            mb: 0.5
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          sx={{ 
            fontSize: '1rem',
            color: 'text.secondary',
            lineHeight: 1.4
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Right Section - Controls */}
      {showControls && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          ml: 4
        }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={refreshData}
            disabled={loading}
            size="medium"
            sx={{
              borderColor: 'divider',
              color: 'text.primary',
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover',
                color: 'primary.main',
              },
            }}
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </Button>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: '8px 16px',
            backgroundColor: isRealTimeActive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)',
            borderRadius: '8px',
            border: `1px solid ${isRealTimeActive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(107, 114, 128, 0.2)'}`,
          }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isRealTimeActive}
                  onChange={handleRealTimeToggle}
                  size="small"
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: 'success.main',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: 'success.main',
                    },
                  }}
                />
              }
              label={
                <Typography 
                  sx={{ 
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'text.primary'
                  }}
                >
                  Real-time Updates
                </Typography>
              }
              sx={{ m: 0 }}
            />
            
            <Chip
              icon={isRealTimeActive ? <PlayArrow sx={{ fontSize: '0.875rem' }} /> : <Pause sx={{ fontSize: '0.875rem' }} />}
              label={isRealTimeActive ? 'LIVE' : 'PAUSED'}
              size="small"
              sx={{
                height: 24,
                fontSize: '0.75rem',
                fontWeight: 600,
                backgroundColor: isRealTimeActive ? 'success.main' : 'text.secondary',
                color: 'white',
                '& .MuiChip-icon': {
                  color: 'white',
                },
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

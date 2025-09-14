import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';

interface ProfessionalHeaderProps {
  title: string;
  subtitle: string;
}

export const ProfessionalHeader: React.FC<ProfessionalHeaderProps> = ({ 
  title, 
  subtitle
}) => {

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
          variant="h4"
          sx={{ 
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'text.primary',
            lineHeight: 1.2,
            mb: 0.5,
            letterSpacing: '-0.02em'
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="subtitle1"
          sx={{ 
            fontSize: '1rem',
            color: 'text.secondary',
            lineHeight: 1.5,
            fontWeight: 400
          }}
        >
          {subtitle}
        </Typography>
      </Box>

    </Box>
  );
};

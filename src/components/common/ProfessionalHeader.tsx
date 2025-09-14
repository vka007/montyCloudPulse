import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { AccountBalance } from '@mui/icons-material';

interface ProfessionalHeaderProps {
  title: string;
  subtitle: string;
  selectedAccount?: string;
  onAccountChange?: (account: string) => void;
  availableAccounts?: string[];
}

export const ProfessionalHeader: React.FC<ProfessionalHeaderProps> = ({ 
  title, 
  subtitle, 
  selectedAccount = 'all',
  onAccountChange,
  availableAccounts = ['all', 'prod-account', 'dev-account', 'staging-account']
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

      {/* Right Section - Account Selection */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        ml: 4
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountBalance sx={{ fontSize: '1.2rem', color: 'text.secondary' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Account:
          </Typography>
        </Box>
        
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={selectedAccount}
            onChange={(e) => onAccountChange?.(e.target.value)}
            sx={{
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                py: 1,
              },
            }}
          >
            {availableAccounts.map((account) => (
              <MenuItem key={account} value={account}>
                {account === 'all' ? 'All Accounts' : account}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

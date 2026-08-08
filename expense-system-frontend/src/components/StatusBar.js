import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

const StatusBar = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 24,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        zIndex: (theme) => theme.zIndex.appBar - 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Logged in as: <strong>{user?.fullName || 'Guest'}</strong>
        </Typography>
        <Chip
          label="Ready"
          size="small"
          color="success"
          sx={{
            height: 18,
            fontSize: '0.65rem',
            '& .MuiChip-label': {
              px: 1,
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {user?.preferredCurrency || 'PKR'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {format(currentTime, 'EEEE, MMMM dd, yyyy')}
        </Typography>
        <Typography variant="caption" color="text.primary" fontWeight={500}>
          {format(currentTime, 'HH:mm')}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatusBar;

import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const RibbonGroup = ({ label, children, showDivider = true }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            flex: 1,
            py: 0.5,
          }}
        >
          {children}
        </Box>
        {label && (
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.65rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              pb: 0.5,
            }}
          >
            {label}
          </Typography>
        )}
      </Box>
      {showDivider && (
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            mx: 1,
            my: 1,
            borderColor: 'divider',
          }}
        />
      )}
    </Box>
  );
};

export default RibbonGroup;

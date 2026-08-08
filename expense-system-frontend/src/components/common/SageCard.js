import React from 'react';
import { Paper, Box, Typography, Divider } from '@mui/material';

/**
 * SageCard - A consistent card component styled like Sage 50cloud
 * Features a colored left border accent and optional header
 */
const SageCard = ({
  title,
  subtitle,
  children,
  accentColor = 'primary.main',
  headerAction,
  noPadding = false,
  elevation = 1,
  sx = {},
  ...props
}) => {
  return (
    <Paper
      elevation={elevation}
      sx={{
        borderLeft: 4,
        borderColor: accentColor,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
      {...props}
    >
      {(title || headerAction) && (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              bgcolor: 'background.default',
            }}
          >
            <Box>
              {title && (
                <Typography variant="subtitle1" fontWeight={600}>
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
            {headerAction && (
              <Box>{headerAction}</Box>
            )}
          </Box>
          <Divider />
        </>
      )}
      <Box
        sx={{
          flex: 1,
          p: noPadding ? 0 : 2,
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default SageCard;

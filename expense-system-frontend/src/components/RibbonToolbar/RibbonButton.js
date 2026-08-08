import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RibbonButton = ({
  label,
  icon,
  onClick,
  path,
  variant = 'vertical',
  size = 'medium',
  disabled = false,
  color = 'inherit'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    if (path) navigate(path);
    else if (onClick) onClick();
  };

  const isVertical = variant === 'vertical';
  const iconSize = size === 'large' ? 28 : size === 'medium' ? 24 : 20;

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      sx={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isVertical ? 0.5 : 1,
        px: isVertical ? 2 : 1.5,
        py: isVertical ? 1 : 0.5,
        minWidth: isVertical ? 72 : 'auto',
        minHeight: isVertical ? 56 : 36,
        color: color === 'inherit' ? 'text.primary' : color,
        borderRadius: 1,
        textTransform: 'none',
        '&:hover': {
          bgcolor: 'action.hover',
          '& .MuiSvgIcon-root': {
            color: 'primary.main',
          },
        },
        '&:disabled': {
          opacity: 0.5,
        },
        '& .MuiSvgIcon-root': {
          fontSize: iconSize,
          transition: 'color 0.2s',
        },
      }}
    >
      {icon && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </Box>
      )}
      <Typography
        variant={isVertical ? 'caption' : 'body2'}
        sx={{
          fontWeight: 500,
          lineHeight: 1.2,
          textAlign: 'center',
        }}
      >
        {label}
      </Typography>
    </Button>
  );
};

export default RibbonButton;

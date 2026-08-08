import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RibbonDropdown = ({
  label,
  icon,
  items = [],
  variant = 'vertical',
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item) => {
    handleClose();
    if (item.path) {
      navigate(item.path);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  const isVertical = variant === 'vertical';

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isVertical ? 0.25 : 0.5,
          px: isVertical ? 2 : 1.5,
          py: isVertical ? 0.75 : 0.5,
          minWidth: isVertical ? 72 : 'auto',
          minHeight: isVertical ? 56 : 36,
          color: 'text.primary',
          borderRadius: 1,
          textTransform: 'none',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        {icon && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon}
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
          <Typography
            variant={isVertical ? 'caption' : 'body2'}
            sx={{ fontWeight: 500, lineHeight: 1.2 }}
          >
            {label}
          </Typography>
          <KeyboardArrowDown
            sx={{
              fontSize: 16,
              transform: open ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
            }}
          />
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            mt: 0.5,
            minWidth: 180,
          },
        }}
      >
        {items.map((item, index) => (
          item.divider ? (
            <Divider key={index} sx={{ my: 0.5 }} />
          ) : (
            <MenuItem
              key={index}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
            >
              {item.icon && (
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.label}
                secondary={item.description}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </MenuItem>
          )
        ))}
      </Menu>
    </>
  );
};

export default RibbonDropdown;

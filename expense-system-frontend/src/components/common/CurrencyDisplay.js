import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatAccountingNumber, getAmountColor } from '../../utils/accountingUtils';

/**
 * CurrencyDisplay - Displays currency values with proper formatting and colors
 * Uses accounting format (parentheses for negatives) and color coding by type
 */
const CurrencyDisplay = ({
  value,
  currency = 'PKR',
  type,
  showCurrency = true,
  showSign = false,
  variant = 'body1',
  align = 'right',
  fontWeight,
  size = 'medium',
  colorByValue = false, // Color based on positive/negative value instead of type
  sx = {},
}) => {
  const theme = useTheme();

  const getColor = () => {
    if (colorByValue) {
      if (value > 0) return theme.palette.accounting?.income || theme.palette.success.main;
      if (value < 0) return theme.palette.accounting?.expense || theme.palette.error.main;
      return theme.palette.text.primary;
    }
    if (type) {
      return getAmountColor(type, theme);
    }
    return theme.palette.text.primary;
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return '0.813rem';
      case 'large':
        return '1.25rem';
      case 'xlarge':
        return '1.5rem';
      default:
        return '0.875rem';
    }
  };

  const formattedValue = formatAccountingNumber(value);
  const displayValue = showSign && value > 0 ? `+${formattedValue}` : formattedValue;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
        gap: 0.5,
        ...sx,
      }}
    >
      {showCurrency && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: size === 'small' ? '0.65rem' : '0.75rem',
          }}
        >
          {currency}
        </Typography>
      )}
      <Typography
        variant={variant}
        sx={{
          color: getColor(),
          fontWeight: fontWeight || (size === 'large' || size === 'xlarge' ? 600 : 500),
          fontSize: getFontSize(),
          fontFamily: '"Segoe UI", monospace',
          letterSpacing: '-0.02em',
        }}
      >
        {displayValue}
      </Typography>
    </Box>
  );
};

export default CurrencyDisplay;

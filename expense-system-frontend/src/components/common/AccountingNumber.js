import React from 'react';
import { Typography } from '@mui/material';
import { formatAccountingNumber } from '../../utils/accountingUtils';

/**
 * AccountingNumber - Displays numbers in accounting format
 * Uses parentheses for negative numbers instead of minus sign
 */
const AccountingNumber = ({
  value,
  decimals = 2,
  variant = 'body2',
  color,
  fontWeight = 500,
  monospace = true,
  sx = {},
}) => {
  const isNegative = value < 0;
  const formatted = formatAccountingNumber(value, decimals);

  return (
    <Typography
      variant={variant}
      sx={{
        color: color || (isNegative ? 'error.main' : 'text.primary'),
        fontWeight,
        fontFamily: monospace ? '"Segoe UI", monospace' : 'inherit',
        letterSpacing: monospace ? '-0.02em' : 'normal',
        whiteSpace: 'nowrap',
        ...sx,
      }}
    >
      {formatted}
    </Typography>
  );
};

export default AccountingNumber;

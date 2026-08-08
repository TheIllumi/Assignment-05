/**
 * Accounting Utility Functions
 * Provides formatting and calculation utilities for accounting displays
 */

/**
 * Format a number in accounting format (parentheses for negatives)
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places (default 2)
 * @returns {string} Formatted number string
 */
export const formatAccountingNumber = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '-';
  }

  const absValue = Math.abs(value);
  const formatted = absValue.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  if (value < 0) {
    return `(${formatted})`;
  }
  return formatted;
};

/**
 * Format currency with currency code
 * @param {number} value - The amount
 * @param {string} currency - Currency code (default 'PKR')
 * @param {boolean} showSymbol - Whether to show currency symbol
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'PKR', showSymbol = true) => {
  const formatted = formatAccountingNumber(value);
  if (showSymbol) {
    return `${currency} ${formatted}`;
  }
  return formatted;
};

/**
 * Classify a transaction amount into debit and credit
 * @param {string} type - Transaction type (INCOME, EXPENSE, TRANSFER)
 * @param {number} amount - Transaction amount
 * @param {string} perspective - 'source' or 'destination' for transfers
 * @returns {object} { debit: number|null, credit: number|null }
 */
export const classifyByDebitCredit = (type, amount, perspective = 'source') => {
  const absAmount = Math.abs(amount);

  switch (type?.toUpperCase()) {
    case 'INCOME':
      // Income: Credit to revenue account, Debit to asset (cash/bank)
      return { debit: absAmount, credit: null };
    case 'EXPENSE':
      // Expense: Debit to expense account, Credit to asset (cash/bank)
      return { debit: null, credit: absAmount };
    case 'TRANSFER':
      // Transfer: Depends on perspective
      if (perspective === 'source') {
        return { debit: null, credit: absAmount };
      }
      return { debit: absAmount, credit: null };
    default:
      return { debit: null, credit: null };
  }
};

/**
 * Get color for amount based on transaction type
 * @param {string} type - Transaction type
 * @param {object} theme - MUI theme object
 * @returns {string} Color value
 */
export const getAmountColor = (type, theme) => {
  const colors = theme?.palette?.accounting || {
    income: '#2E7D32',
    expense: '#C62828',
    neutral: '#1565C0',
  };

  switch (type?.toUpperCase()) {
    case 'INCOME':
      return colors.income;
    case 'EXPENSE':
      return colors.expense;
    case 'TRANSFER':
      return colors.neutral;
    default:
      return theme?.palette?.text?.primary || '#212121';
  }
};

/**
 * Calculate running balance for a list of transactions
 * @param {array} transactions - Array of transaction objects
 * @param {number} openingBalance - Starting balance
 * @returns {array} Transactions with running balance added
 */
export const calculateRunningBalance = (transactions, openingBalance = 0) => {
  let balance = openingBalance;

  return transactions.map(transaction => {
    const amount = parseFloat(transaction.amount) || 0;

    switch (transaction.type?.toUpperCase()) {
      case 'INCOME':
        balance += amount;
        break;
      case 'EXPENSE':
        balance -= amount;
        break;
      case 'TRANSFER':
        // For transfers, the impact depends on whether this is source or destination
        // This is typically handled at the account level
        break;
      default:
        break;
    }

    return {
      ...transaction,
      runningBalance: balance,
    };
  });
};

/**
 * Generate account code based on account type
 * @param {string} type - Account type (ASSET, LIABILITY, INCOME, EXPENSE)
 * @param {number} sequence - Sequential number
 * @returns {string} Account code
 */
export const generateAccountCode = (type, sequence = 1) => {
  const prefixes = {
    ASSET: '1',
    LIABILITY: '2',
    EQUITY: '3',
    INCOME: '4',
    EXPENSE: '5',
  };

  const prefix = prefixes[type?.toUpperCase()] || '9';
  return `${prefix}${String(sequence).padStart(4, '0')}`;
};

/**
 * Calculate net worth from chart of accounts data
 * @param {object} chartData - Chart of accounts data
 * @returns {number} Net worth (Assets - Liabilities)
 */
export const calculateNetWorth = (chartData) => {
  const totalAssets = parseFloat(chartData?.totalAssets) || 0;
  const totalLiabilities = parseFloat(chartData?.totalLiabilities) || 0;
  return totalAssets - totalLiabilities;
};

/**
 * Calculate net profit from income and expenses
 * @param {number} totalIncome - Total income
 * @param {number} totalExpenses - Total expenses
 * @returns {number} Net profit
 */
export const calculateNetProfit = (totalIncome, totalExpenses) => {
  return (parseFloat(totalIncome) || 0) - (parseFloat(totalExpenses) || 0);
};

/**
 * Format date for accounting reports
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatAccountingDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};

/**
 * Get period description for reports
 * @param {Date} startDate - Period start
 * @param {Date} endDate - Period end
 * @returns {string} Period description
 */
export const getPeriodDescription = (startDate, endDate) => {
  if (!startDate && !endDate) {
    return 'All Time';
  }

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : new Date();

  if (!start) {
    return `Through ${formatAccountingDate(end)}`;
  }

  return `${formatAccountingDate(start)} - ${formatAccountingDate(end)}`;
};

export default {
  formatAccountingNumber,
  formatCurrency,
  classifyByDebitCredit,
  getAmountColor,
  calculateRunningBalance,
  generateAccountCode,
  calculateNetWorth,
  calculateNetProfit,
  formatAccountingDate,
  getPeriodDescription,
};

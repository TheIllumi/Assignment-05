import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Collapse,
  CircularProgress,
  Alert,
  Tooltip,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Add as AddIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  FileDownload as ExportIcon,
  Print as PrintIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import TransactionsService from '../api/transactionsService';
import AccountsService from '../api/accountsService';
import CategoriesService from '../api/categoriesService';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import TransactionDialog from '../components/TransactionDialog';
import { SageCard, SageTable, CurrencyDisplay } from '../components/common';
import { formatAccountingDate, formatAccountingNumber, calculateRunningBalance } from '../utils/accountingUtils';

const Transactions = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const isTransferPage = location.pathname === '/transfers';

  const [transactions, setTransactions] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Filters
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    accountId: '',
    categoryId: '',
    type: isTransferPage ? 'TRANSFER' : '',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    keyword: '',
  });

  // Reset filters if location changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      type: location.pathname === '/transfers' ? 'TRANSFER' : '',
    }));
    setPage(0);
  }, [location.pathname]);

  // Dropdown Data
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch helpers
  const fetchMetadata = async () => {
    try {
      const [accData, catData] = await Promise.all([
        AccountsService.getAll(user.userId),
        CategoriesService.getAll(user.userId),
      ]);
      setAccounts(accData);
      setCategories(catData);
    } catch (err) {
      console.error('Failed to load metadata', err);
    }
  };

  const fetchTransactions = useCallback(
    async (showRefresh = false) => {
      if (showRefresh) setRefreshing(true);
      setLoading(true);
      try {
        const result = await TransactionsService.search({
          userId: user.userId,
          page,
          size: rowsPerPage,
          accountId: filters.accountId || null,
          categoryId: filters.categoryId || null,
          type: filters.type || null,
          startDate: filters.startDate || null,
          endDate: filters.endDate || null,
          keyword: filters.keyword || null,
        });
        // Add running balance to transactions
        const transactionsWithBalance = calculateRunningBalance(
          result.transactions || [],
          0 // Opening balance - could be fetched from account
        );
        setTransactions(transactionsWithBalance);
        setTotalElements(result.totalElements);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [user.userId, page, rowsPerPage, filters]
  );

  useEffect(() => {
    if (user) {
      fetchMetadata();
      fetchTransactions();
    }
  }, [user, fetchTransactions]);

  // Listen for transaction created events
  useEffect(() => {
    const handleTransactionCreated = () => {
      fetchTransactions(true);
    };
    window.addEventListener('transactionCreated', handleTransactionCreated);
    return () => {
      window.removeEventListener('transactionCreated', handleTransactionCreated);
    };
  }, [fetchTransactions]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleFilterChange = (prop) => (event) => {
    setFilters({ ...filters, [prop]: event.target.value });
    setPage(0);
  };

  const clearFilters = () => {
    setFilters({
      accountId: '',
      categoryId: '',
      type: isTransferPage ? 'TRANSFER' : '',
      startDate: '',
      endDate: '',
      keyword: '',
    });
    setPage(0);
  };

  const handleRefresh = () => {
    fetchTransactions(true);
  };

  // Calculate totals
  const totals = transactions.reduce(
    (acc, t) => {
      const amount = parseFloat(t.amount) || 0;
      if (t.type === 'INCOME') {
        acc.totalDebit += amount;
      } else if (t.type === 'EXPENSE') {
        acc.totalCredit += amount;
      }
      return acc;
    },
    { totalDebit: 0, totalCredit: 0 }
  );

  // Table columns - Sage register style with Debit/Credit
  const columns = [
    {
      id: 'transactionDate',
      label: 'Date',
      minWidth: 100,
      render: (value) => (
        <Typography variant="body2" fontFamily="monospace">
          {formatAccountingDate(value)}
        </Typography>
      ),
    },
    {
      id: 'referenceNumber',
      label: 'Ref #',
      minWidth: 80,
      render: (value) => (
        <Typography variant="body2" fontFamily="monospace" color="text.secondary">
          {value || '-'}
        </Typography>
      ),
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 200,
    },
    {
      id: 'accountName',
      label: 'Account',
      minWidth: 140,
    },
    {
      id: 'categoryName',
      label: 'Category',
      minWidth: 120,
      render: (value) => (
        <Chip label={value || 'Uncategorized'} size="small" variant="outlined" />
      ),
    },
    {
      id: 'debit',
      label: 'Debit',
      align: 'right',
      minWidth: 110,
      sx: { bgcolor: 'action.hover' },
      render: (value, row) =>
        row.type === 'INCOME' ? (
          <Typography
            variant="body2"
            fontWeight={500}
            fontFamily="monospace"
            color="success.main"
          >
            {formatAccountingNumber(row.amount)}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            -
          </Typography>
        ),
    },
    {
      id: 'credit',
      label: 'Credit',
      align: 'right',
      minWidth: 110,
      sx: { bgcolor: 'action.hover' },
      render: (value, row) =>
        row.type === 'EXPENSE' ? (
          <Typography
            variant="body2"
            fontWeight={500}
            fontFamily="monospace"
            color="error.main"
          >
            {formatAccountingNumber(row.amount)}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            -
          </Typography>
        ),
    },
    {
      id: 'runningBalance',
      label: 'Balance',
      align: 'right',
      minWidth: 120,
      render: (value, row) => (
        <CurrencyDisplay
          value={value}
          currency={row.currencyCode}
          showCurrency={false}
          colorByValue
        />
      ),
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
      minWidth: 90,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={value === 'COMPLETED' || value === 'CLEARED' ? 'success' : 'default'}
          variant="outlined"
          sx={{ fontSize: '0.65rem' }}
        />
      ),
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            {isTransferPage ? 'Transfer Register' : 'Transaction Register'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {totalElements} transactions found
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh} disabled={refreshing}>
              <RefreshIcon sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton>
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export">
            <IconButton>
              <ExportIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            startIcon={showFilters ? <ExpandLessIcon /> : <FilterIcon />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            New Entry
          </Button>
        </Box>
      </Box>

      {/* Transaction Dialog */}
      <TransactionDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSuccess={() => {
          fetchTransactions(true);
          fetchMetadata();
        }}
      />

      {/* Filters Panel */}
      <Collapse in={showFilters}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                label="Account"
                fullWidth
                size="small"
                value={filters.accountId}
                onChange={handleFilterChange('accountId')}
              >
                <MenuItem value="">
                  <em>All Accounts</em>
                </MenuItem>
                {accounts.map((acc) => (
                  <MenuItem key={acc.id} value={acc.id}>
                    {acc.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                label="Category"
                fullWidth
                size="small"
                value={filters.categoryId}
                onChange={handleFilterChange('categoryId')}
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                label="Type"
                fullWidth
                size="small"
                value={filters.type}
                onChange={handleFilterChange('type')}
                disabled={isTransferPage}
              >
                <MenuItem value="">
                  <em>All Types</em>
                </MenuItem>
                <MenuItem value="EXPENSE">Expense</MenuItem>
                <MenuItem value="INCOME">Income</MenuItem>
                <MenuItem value="TRANSFER">Transfer</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="From Date"
                type="date"
                fullWidth
                size="small"
                value={filters.startDate}
                onChange={handleFilterChange('startDate')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="To Date"
                type="date"
                fullWidth
                size="small"
                value={filters.endDate}
                onChange={handleFilterChange('endDate')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  label="Search"
                  fullWidth
                  size="small"
                  placeholder="Description..."
                  value={filters.keyword}
                  onChange={handleFilterChange('keyword')}
                />
                <Tooltip title="Clear Filters">
                  <IconButton onClick={clearFilters} size="small">
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Collapse>

      {/* Transactions Table */}
      <SageCard
        title="Register"
        accentColor="primary.main"
        noPadding
      >
        <SageTable
          columns={columns}
          data={transactions}
          loading={loading}
          emptyMessage="No transactions found for the selected criteria"
          pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalElements}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[10, 25, 50, 100]}
          size="small"
        />

        {/* Totals Footer */}
        {transactions.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              p: 2,
              bgcolor: 'background.default',
              borderTop: 2,
              borderColor: 'primary.main',
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} sx={{ mr: 4 }}>
              PAGE TOTALS
            </Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">
                  Total Debits
                </Typography>
                <Typography variant="subtitle2" fontWeight={600} fontFamily="monospace" color="success.main">
                  {formatAccountingNumber(totals.totalDebit)}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">
                  Total Credits
                </Typography>
                <Typography variant="subtitle2" fontWeight={600} fontFamily="monospace" color="error.main">
                  {formatAccountingNumber(totals.totalCredit)}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">
                  Net Change
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  fontFamily="monospace"
                  color={totals.totalDebit - totals.totalCredit >= 0 ? 'success.main' : 'error.main'}
                >
                  {formatAccountingNumber(totals.totalDebit - totals.totalCredit)}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </SageCard>

      {/* CSS for refresh animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default Transactions;

import React, { useEffect, useState, useCallback } from 'react';
import {
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Refresh as RefreshIcon,
  Print as PrintIcon,
  FileDownload as ExportIcon,
  FilterList as FilterIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import TransactionsService from '../api/transactionsService';
import ChartOfAccountsService from '../api/chartOfAccountsService';
import { SageCard, SageTable, CurrencyDisplay } from '../components/common';
import { formatAccountingDate, formatAccountingNumber } from '../utils/accountingUtils';

// Tab Panel Component
const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`gl-tabpanel-${index}`}
    aria-labelledby={`gl-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);

// Journal Entry Row Component
const JournalEntryRow = ({ transaction, isDebit }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        px: 2,
        bgcolor: isDebit ? 'transparent' : 'action.hover',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ width: 100 }}>
        <Typography variant="body2">
          {formatAccountingDate(transaction.transactionDate)}
        </Typography>
      </Box>
      <Box sx={{ width: 80, textAlign: 'center' }}>
        <Typography variant="body2" fontFamily="monospace">
          {transaction.referenceNumber || '-'}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, pl: isDebit ? 0 : 4 }}>
        <Typography variant="body2">
          {transaction.accountName || transaction.categoryName}
        </Typography>
        {transaction.description && (
          <Typography variant="caption" color="text.secondary">
            {transaction.description}
          </Typography>
        )}
      </Box>
      <Box sx={{ width: 120, textAlign: 'right' }}>
        {isDebit ? (
          <CurrencyDisplay
            value={transaction.amount}
            currency={transaction.currencyCode}
            showCurrency={false}
          />
        ) : (
          <Typography variant="body2">-</Typography>
        )}
      </Box>
      <Box sx={{ width: 120, textAlign: 'right' }}>
        {!isDebit ? (
          <CurrencyDisplay
            value={transaction.amount}
            currency={transaction.currencyCode}
            showCurrency={false}
          />
        ) : (
          <Typography variant="body2">-</Typography>
        )}
      </Box>
    </Box>
  );
};

const GeneralLedger = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [chartOfAccounts, setChartOfAccounts] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [transactionsData, coaData] = await Promise.all([
        TransactionsService.search({
          userId: user.userId,
          page: 0,
          size: 100,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        }),
        ChartOfAccountsService.getChartOfAccounts(user.userId),
      ]);

      setTransactions(transactionsData.content || transactionsData.transactions || []);
      setChartOfAccounts(coaData);
      setError(null);
    } catch (err) {
      setError('Failed to load ledger data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user, dateRange]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDateChange = (field) => (event) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  // Calculate trial balance data
  const calculateTrialBalance = () => {
    if (!chartOfAccounts) return { accounts: [], totalDebit: 0, totalCredit: 0 };

    const allAccounts = [
      ...(chartOfAccounts.assets || []).map(a => ({ ...a, category: 'Assets', isDebit: true })),
      ...(chartOfAccounts.liabilities || []).map(a => ({ ...a, category: 'Liabilities', isDebit: false })),
      ...(chartOfAccounts.income || []).map(a => ({ ...a, category: 'Income', isDebit: false })),
      ...(chartOfAccounts.expenses || []).map(a => ({ ...a, category: 'Expenses', isDebit: true })),
    ];

    let totalDebit = 0;
    let totalCredit = 0;

    const accounts = allAccounts.map(account => {
      const balance = Math.abs(parseFloat(account.balance) || 0);
      if (account.isDebit) {
        totalDebit += balance;
      } else {
        totalCredit += balance;
      }
      return {
        ...account,
        debit: account.isDebit ? balance : 0,
        credit: !account.isDebit ? balance : 0,
      };
    });

    return { accounts, totalDebit, totalCredit };
  };

  const trialBalance = calculateTrialBalance();

  // Journal entries columns
  const journalColumns = [
    {
      id: 'transactionDate',
      label: 'Date',
      minWidth: 100,
      render: (value) => formatAccountingDate(value),
    },
    {
      id: 'referenceNumber',
      label: 'Ref #',
      minWidth: 80,
      render: (value) => value || '-',
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 200,
    },
    {
      id: 'accountName',
      label: 'Account',
      minWidth: 150,
    },
    {
      id: 'debit',
      label: 'Debit',
      align: 'right',
      minWidth: 120,
      render: (value, row) => (
        row.type === 'EXPENSE' || row.type === 'INCOME' ? (
          <CurrencyDisplay
            value={row.type === 'EXPENSE' ? row.amount : 0}
            showCurrency={false}
          />
        ) : '-'
      ),
    },
    {
      id: 'credit',
      label: 'Credit',
      align: 'right',
      minWidth: 120,
      render: (value, row) => (
        row.type === 'INCOME' || row.type === 'EXPENSE' ? (
          <CurrencyDisplay
            value={row.type === 'INCOME' ? row.amount : 0}
            showCurrency={false}
          />
        ) : '-'
      ),
    },
  ];

  // Trial balance columns
  const trialBalanceColumns = [
    {
      id: 'code',
      label: 'Account Code',
      minWidth: 120,
      render: (value) => (
        <Typography variant="body2" fontFamily="monospace" fontWeight={500}>
          {value}
        </Typography>
      ),
    },
    {
      id: 'name',
      label: 'Account Name',
      minWidth: 200,
    },
    {
      id: 'category',
      label: 'Type',
      minWidth: 100,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          variant="outlined"
          sx={{ fontSize: '0.7rem' }}
        />
      ),
    },
    {
      id: 'debit',
      label: 'Debit',
      align: 'right',
      minWidth: 120,
      render: (value) => value > 0 ? formatAccountingNumber(value) : '-',
    },
    {
      id: 'credit',
      label: 'Credit',
      align: 'right',
      minWidth: 120,
      render: (value) => value > 0 ? formatAccountingNumber(value) : '-',
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <CircularProgress size={48} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Loading general ledger...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
        <Button size="small" onClick={fetchData} sx={{ ml: 2 }}>
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            General Ledger
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View journal entries, trial balance, and account registers
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Refresh">
            <IconButton onClick={fetchData}>
              <RefreshIcon />
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
        </Box>
      </Box>

      {/* Date Range Filter */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <CalendarIcon color="action" />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              label="From Date"
              type="date"
              value={dateRange.startDate}
              onChange={handleDateChange('startDate')}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              label="To Date"
              type="date"
              value={dateRange.endDate}
              onChange={handleDateChange('endDate')}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={fetchData} startIcon={<FilterIcon />}>
              Apply
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            px: 2,
          }}
        >
          <Tab label="Journal Entries" />
          <Tab label="Trial Balance" />
          <Tab label="Account Register" />
        </Tabs>

        {/* Journal Entries Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ px: 2, pb: 2 }}>
            <SageCard
              title="Journal Entries"
              subtitle={`${transactions.length} entries found`}
              accentColor="primary.main"
              noPadding
            >
              <SageTable
                columns={journalColumns}
                data={transactions}
                emptyMessage="No journal entries found for this period"
                size="small"
              />
            </SageCard>
          </Box>
        </TabPanel>

        {/* Trial Balance Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ px: 2, pb: 2 }}>
            <SageCard
              title="Trial Balance"
              subtitle={`As of ${formatAccountingDate(dateRange.endDate)}`}
              accentColor="secondary.main"
              noPadding
            >
              <SageTable
                columns={trialBalanceColumns}
                data={trialBalance.accounts}
                emptyMessage="No accounts found"
                size="small"
              />

              {/* Totals Row */}
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
                  TOTALS
                </Typography>
                <Box sx={{ width: 120, textAlign: 'right', mr: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600} fontFamily="monospace">
                    {formatAccountingNumber(trialBalance.totalDebit)}
                  </Typography>
                </Box>
                <Box sx={{ width: 120, textAlign: 'right' }}>
                  <Typography variant="subtitle2" fontWeight={600} fontFamily="monospace">
                    {formatAccountingNumber(trialBalance.totalCredit)}
                  </Typography>
                </Box>
              </Box>

              {/* Balance Check */}
              <Box sx={{ p: 2, bgcolor: Math.abs(trialBalance.totalDebit - trialBalance.totalCredit) < 0.01 ? 'success.light' : 'error.light' }}>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color={Math.abs(trialBalance.totalDebit - trialBalance.totalCredit) < 0.01 ? 'success.dark' : 'error.dark'}
                >
                  {Math.abs(trialBalance.totalDebit - trialBalance.totalCredit) < 0.01
                    ? 'Trial Balance is in balance'
                    : `Out of balance by ${formatAccountingNumber(Math.abs(trialBalance.totalDebit - trialBalance.totalCredit))}`
                  }
                </Typography>
              </Box>
            </SageCard>
          </Box>
        </TabPanel>

        {/* Account Register Tab */}
        <TabPanel value={activeTab} index={2}>
          <Box sx={{ px: 2, pb: 2 }}>
            <Grid container spacing={3}>
              {/* Assets */}
              <Grid item xs={12} md={6}>
                <SageCard title="Assets" accentColor="info.main">
                  {chartOfAccounts?.assets?.map((account) => (
                    <Box
                      key={account.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <Box>
                        <Typography variant="body2" fontFamily="monospace" color="text.secondary">
                          {account.code}
                        </Typography>
                        <Typography variant="subtitle2">{account.name}</Typography>
                      </Box>
                      <CurrencyDisplay
                        value={account.balance}
                        currency={account.currency}
                        colorByValue
                      />
                    </Box>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Total Assets</Typography>
                    <CurrencyDisplay
                      value={chartOfAccounts?.totalAssets}
                      size="medium"
                      fontWeight={600}
                    />
                  </Box>
                </SageCard>
              </Grid>

              {/* Liabilities */}
              <Grid item xs={12} md={6}>
                <SageCard title="Liabilities" accentColor="error.main">
                  {chartOfAccounts?.liabilities?.map((account) => (
                    <Box
                      key={account.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <Box>
                        <Typography variant="body2" fontFamily="monospace" color="text.secondary">
                          {account.code}
                        </Typography>
                        <Typography variant="subtitle2">{account.name}</Typography>
                      </Box>
                      <CurrencyDisplay
                        value={account.balance}
                        currency={account.currency}
                        colorByValue
                      />
                    </Box>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Total Liabilities</Typography>
                    <CurrencyDisplay
                      value={chartOfAccounts?.totalLiabilities}
                      size="medium"
                      fontWeight={600}
                    />
                  </Box>
                </SageCard>
              </Grid>

              {/* Net Worth */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  }}
                >
                  <Typography variant="h6" fontWeight={500}>
                    Net Worth (Assets - Liabilities)
                  </Typography>
                  <Typography variant="h4" fontWeight={600} fontFamily="monospace">
                    PKR {formatAccountingNumber(chartOfAccounts?.netWorth)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default GeneralLedger;

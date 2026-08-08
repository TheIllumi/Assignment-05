import React, { useEffect, useState, useCallback } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Chip,
  CircularProgress,
  Button,
  IconButton,
  Tooltip,
  Alert,
  LinearProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as AccountBalanceIcon,
  Receipt as ReceiptIcon,
  SwapHoriz as SwapHorizIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  ArrowForward as ArrowForwardIcon,
  Wallet as WalletIcon,
  Savings as SavingsIcon,
  CreditCard as CreditCardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DashboardService from '../api/dashboardService';
import { useAuth } from '../context/AuthContext';
import { SageCard, SageTable, CurrencyDisplay } from '../components/common';
import { formatAccountingDate, calculateNetProfit } from '../utils/accountingUtils';
import '../utils/chartSetup';

// KPI Summary Widget Component
const KPIWidget = ({ title, value, icon, trend, trendValue, accentColor, currency = 'PKR' }) => {
  const theme = useTheme();
  const isPositiveTrend = trend === 'up';

  return (
    <Paper
      sx={{
        p: 2.5,
        height: '100%',
        borderLeft: 4,
        borderColor: accentColor,
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" fontWeight={500}>
          {title}
        </Typography>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: `${accentColor}15`,
            color: accentColor,
          }}
        >
          {icon}
        </Box>
      </Box>

      <CurrencyDisplay
        value={value}
        currency={currency}
        size="xlarge"
        colorByValue={title === 'Net Savings'}
        align="left"
      />

      {trendValue !== undefined && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto', pt: 1.5 }}>
          <Chip
            size="small"
            icon={isPositiveTrend ? <TrendingUpIcon /> : <TrendingDownIcon />}
            label={`${trendValue > 0 ? '+' : ''}${trendValue}%`}
            sx={{
              height: 24,
              bgcolor: isPositiveTrend ? 'success.light' : 'error.light',
              color: isPositiveTrend ? 'success.dark' : 'error.dark',
              '& .MuiChip-icon': {
                fontSize: 16,
              },
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            vs last period
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

// Quick Action Button Component
const QuickActionButton = ({ icon, label, onClick, color = 'primary' }) => (
  <Button
    variant="outlined"
    color={color}
    onClick={onClick}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 2,
      px: 3,
      minHeight: 80,
      flex: 1,
      gap: 0.5,
      borderWidth: 1,
      '&:hover': {
        borderWidth: 1,
        bgcolor: 'action.hover',
      },
    }}
  >
    {icon}
    <Typography variant="caption" fontWeight={500}>
      {label}
    </Typography>
  </Button>
);

// Account Summary Item Component
const AccountItem = ({ account, onClick }) => {
  const theme = useTheme();

  const getAccountIcon = (type) => {
    switch (type?.toUpperCase()) {
      case 'BANK':
        return <AccountBalanceIcon />;
      case 'CREDIT_CARD':
        return <CreditCardIcon />;
      case 'CASH':
        return <WalletIcon />;
      default:
        return <SavingsIcon />;
    }
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1.5,
        borderRadius: 1,
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: 'action.hover',
        },
        '&:not(:last-child)': {
          borderBottom: 1,
          borderColor: 'divider',
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
          mr: 2,
        }}
      >
        {getAccountIcon(account.accountType)}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" fontWeight={600}>
          {account.accountName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {account.accountType}
        </Typography>
      </Box>
      <CurrencyDisplay
        value={account.currentBalance || account.balance}
        currency={account.currencyCode}
        size="medium"
        colorByValue
      />
    </Box>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const data = await DashboardService.getSummary(user.userId);
      setSummary(data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchData();
    }

    // Listen for transaction created events
    const handleTransactionCreated = () => {
      fetchData(true);
    };
    window.addEventListener('transactionCreated', handleTransactionCreated);

    return () => {
      window.removeEventListener('transactionCreated', handleTransactionCreated);
    };
  }, [user, fetchData]);

  const handleRefresh = () => {
    fetchData(true);
  };

  // Transaction table columns
  const transactionColumns = [
    {
      id: 'transactionDate',
      label: 'Date',
      minWidth: 100,
      render: (value) => formatAccountingDate(value),
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 180,
    },
    {
      id: 'categoryName',
      label: 'Category',
      minWidth: 120,
    },
    {
      id: 'accountName',
      label: 'Account',
      minWidth: 120,
    },
    {
      id: 'amount',
      label: 'Amount',
      align: 'right',
      minWidth: 120,
      render: (value, row) => (
        <CurrencyDisplay
          value={value}
          currency={row.currencyCode}
          type={row.type}
          showCurrency
        />
      ),
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
      minWidth: 100,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={value === 'COMPLETED' || value === 'CLEARED' ? 'success' : 'default'}
          variant="outlined"
          sx={{ fontSize: '0.7rem' }}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <CircularProgress size={48} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Loading dashboard...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
        <Button size="small" onClick={handleRefresh} sx={{ ml: 2 }}>
          Retry
        </Button>
      </Alert>
    );
  }

  if (!summary) return null;

  const netProfit = calculateNetProfit(summary.totalIncome, summary.totalExpense);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            Financial Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {summary.periodDescription || 'Current Period'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh} disabled={refreshing}>
              <RefreshIcon sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {refreshing && <LinearProgress sx={{ mb: 2 }} />}

      {/* KPI Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPIWidget
            title="Total Balance"
            value={summary.totalBalance}
            icon={<AccountBalanceIcon />}
            accentColor={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPIWidget
            title="Total Income"
            value={summary.totalIncome}
            icon={<TrendingUpIcon />}
            trend="up"
            accentColor={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPIWidget
            title="Total Expenses"
            value={summary.totalExpense}
            icon={<TrendingDownIcon />}
            accentColor={theme.palette.error.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPIWidget
            title="Net Savings"
            value={netProfit}
            icon={<SavingsIcon />}
            trend={netProfit >= 0 ? 'up' : 'down'}
            accentColor={netProfit >= 0 ? theme.palette.success.main : theme.palette.error.main}
          />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          {/* Quick Actions */}
          <SageCard
            title="Quick Actions"
            accentColor="primary.main"
            sx={{ mb: 3 }}
          >
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <QuickActionButton
                icon={<AddIcon />}
                label="New Transaction"
                onClick={() => window.dispatchEvent(new CustomEvent('openTransactionDialog'))}
              />
              <QuickActionButton
                icon={<SwapHorizIcon />}
                label="Transfer"
                onClick={() => navigate('/transfers')}
              />
              <QuickActionButton
                icon={<AssessmentIcon />}
                label="View Reports"
                onClick={() => navigate('/reports')}
              />
              <QuickActionButton
                icon={<ReceiptIcon />}
                label="All Transactions"
                onClick={() => navigate('/transactions')}
              />
            </Box>
          </SageCard>

          {/* Recent Transactions */}
          <SageCard
            title="Recent Transactions"
            subtitle={`${summary.transactionCount || 0} total transactions`}
            accentColor="info.main"
            headerAction={
              <Button
                size="small"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/transactions')}
              >
                View All
              </Button>
            }
            noPadding
          >
            <SageTable
              columns={transactionColumns}
              data={summary.recentTransactions || []}
              emptyMessage="No recent transactions"
              size="small"
              onRowClick={(row) => navigate(`/transactions?id=${row.transactionId}`)}
            />
          </SageCard>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          {/* Accounts at a Glance */}
          <SageCard
            title="Accounts at a Glance"
            subtitle={`${summary.accountCount || summary.accounts?.length || 0} active accounts`}
            accentColor="secondary.main"
            headerAction={
              <Button
                size="small"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/accounts')}
              >
                Manage
              </Button>
            }
          >
            <Box>
              {summary.accounts?.length > 0 ? (
                summary.accounts.map((account) => (
                  <AccountItem
                    key={account.accountId}
                    account={account}
                    onClick={() => navigate(`/accounts?id=${account.accountId}`)}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" textAlign="center" py={3}>
                  No accounts found
                </Typography>
              )}
            </Box>
          </SageCard>

          {/* Financial Summary */}
          <SageCard
            title="Period Summary"
            accentColor="warning.main"
            sx={{ mt: 3 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Total Income
                </Typography>
                <CurrencyDisplay value={summary.totalIncome} type="INCOME" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Total Expenses
                </Typography>
                <CurrencyDisplay value={summary.totalExpense} type="EXPENSE" />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pt: 2,
                  borderTop: 1,
                  borderColor: 'divider',
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Net Profit/Loss
                </Typography>
                <CurrencyDisplay
                  value={netProfit}
                  size="large"
                  colorByValue
                  fontWeight={600}
                />
              </Box>
            </Box>
          </SageCard>
        </Grid>
      </Grid>

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

export default Dashboard;

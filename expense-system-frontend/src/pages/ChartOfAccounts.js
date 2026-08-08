import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Divider,
  Button,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Print as PrintIcon,
  FileDownload as ExportIcon,
  Search as SearchIcon,
  AccountBalance as AssetIcon,
  CreditCard as LiabilityIcon,
  TrendingUp as IncomeIcon,
  TrendingDown as ExpenseIcon,
} from '@mui/icons-material';
import ChartOfAccountsService from '../api/chartOfAccountsService';
import { useAuth } from '../context/AuthContext';
import { SageCard, SageTable, CurrencyDisplay } from '../components/common';
import { formatAccountingNumber } from '../utils/accountingUtils';

// Account Section Component with Sage styling
const AccountSection = ({ title, items, total, icon, accentColor, expanded = true }) => {
  const theme = useTheme();

  if (!items || items.length === 0) return null;

  const columns = [
    {
      id: 'code',
      label: 'Code',
      minWidth: 100,
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
      id: 'subType',
      label: 'Type',
      minWidth: 120,
      render: (value) => (
        <Chip
          label={value || 'General'}
          size="small"
          variant="outlined"
          sx={{ fontSize: '0.7rem' }}
        />
      ),
    },
    {
      id: 'balance',
      label: 'Balance',
      align: 'right',
      minWidth: 130,
      render: (value, row) => (
        <CurrencyDisplay
          value={value}
          currency={row.currency}
          showCurrency
          colorByValue
        />
      ),
    },
  ];

  return (
    <Accordion
      defaultExpanded={expanded}
      sx={{
        mb: 2,
        borderLeft: 4,
        borderColor: accentColor,
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          bgcolor: 'background.default',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            pr: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: `${accentColor}15`,
                color: accentColor,
              }}
            >
              {icon}
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {items.length} accounts
              </Typography>
            </Box>
          </Box>
          {total !== undefined && (
            <Typography
              variant="h6"
              fontWeight={600}
              fontFamily="monospace"
              color={total >= 0 ? 'text.primary' : 'error.main'}
            >
              PKR {formatAccountingNumber(total)}
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <SageTable
          columns={columns}
          data={items}
          size="small"
          emptyMessage="No accounts in this category"
        />
      </AccordionDetails>
    </Accordion>
  );
};

const ChartOfAccounts = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const result = await ChartOfAccountsService.getChartOfAccounts(user.userId);
      setData(result);
      setError(null);
    } catch (err) {
      setError('Failed to load Chart of Accounts');
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
  }, [user, fetchData]);

  const handleRefresh = () => {
    fetchData(true);
  };

  // Filter accounts based on search query
  const filterAccounts = (accounts) => {
    if (!searchQuery || !accounts) return accounts;
    const query = searchQuery.toLowerCase();
    return accounts.filter(
      (acc) =>
        acc.name?.toLowerCase().includes(query) ||
        acc.code?.toLowerCase().includes(query) ||
        acc.subType?.toLowerCase().includes(query)
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
        }}
      >
        <CircularProgress size={48} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Loading chart of accounts...
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

  if (!data) return null;

  const totalAccounts =
    (data.assets?.length || 0) +
    (data.liabilities?.length || 0) +
    (data.income?.length || 0) +
    (data.expenses?.length || 0);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            Chart of Accounts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complete listing of all accounts categorized by financial type
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
          <Button variant="contained" startIcon={<AddIcon />}>
            New Account
          </Button>
        </Box>
      </Box>

      {/* Search and Summary */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'flex-end' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Total Accounts
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {totalAccounts}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Total Assets
                </Typography>
                <Typography variant="h6" fontWeight={600} color="info.main">
                  PKR {formatAccountingNumber(data.totalAssets)}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Total Liabilities
                </Typography>
                <Typography variant="h6" fontWeight={600} color="error.main">
                  PKR {formatAccountingNumber(data.totalLiabilities)}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Net Worth
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color={data.netWorth >= 0 ? 'success.main' : 'error.main'}
                >
                  PKR {formatAccountingNumber(data.netWorth)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Account Sections */}
      <Grid container spacing={3}>
        {/* Balance Sheet Accounts */}
        <Grid item xs={12} lg={6}>
          <SageCard
            title="Balance Sheet Accounts"
            subtitle="Assets & Liabilities"
            accentColor="primary.main"
            sx={{ mb: 3 }}
          >
            <AccountSection
              title="Assets"
              items={filterAccounts(data.assets)}
              total={data.totalAssets}
              icon={<AssetIcon />}
              accentColor={theme.palette.info.main}
            />

            <AccountSection
              title="Liabilities"
              items={filterAccounts(data.liabilities)}
              total={data.totalLiabilities}
              icon={<LiabilityIcon />}
              accentColor={theme.palette.error.main}
            />

            {/* Net Worth Summary */}
            <Paper
              sx={{
                p: 2.5,
                mt: 2,
                bgcolor: data.netWorth >= 0 ? 'success.light' : 'error.light',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                fontWeight={500}
                color={data.netWorth >= 0 ? 'success.dark' : 'error.dark'}
              >
                Net Worth (Assets - Liabilities)
              </Typography>
              <Typography
                variant="h5"
                fontWeight={700}
                fontFamily="monospace"
                color={data.netWorth >= 0 ? 'success.dark' : 'error.dark'}
              >
                PKR {formatAccountingNumber(data.netWorth)}
              </Typography>
            </Paper>
          </SageCard>
        </Grid>

        {/* Income Statement Accounts */}
        <Grid item xs={12} lg={6}>
          <SageCard
            title="Income Statement Accounts"
            subtitle="Revenue & Expenses"
            accentColor="secondary.main"
            sx={{ mb: 3 }}
          >
            <AccountSection
              title="Revenue (Income)"
              items={filterAccounts(data.income)}
              icon={<IncomeIcon />}
              accentColor={theme.palette.success.main}
            />

            <AccountSection
              title="Expenses"
              items={filterAccounts(data.expenses)}
              icon={<ExpenseIcon />}
              accentColor={theme.palette.warning.main}
            />

            {/* Account Types Legend */}
            <Paper sx={{ p: 2, mt: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Account Code Structure
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: 'info.main',
                    }}
                  />
                  <Typography variant="caption">1xxx - Assets</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: 'error.main',
                    }}
                  />
                  <Typography variant="caption">2xxx - Liabilities</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                    }}
                  />
                  <Typography variant="caption">4xxx - Income</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: 'warning.main',
                    }}
                  />
                  <Typography variant="caption">5xxx - Expenses</Typography>
                </Box>
              </Box>
            </Paper>
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

export default ChartOfAccounts;

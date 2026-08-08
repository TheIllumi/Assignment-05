import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  CardActions,
  Divider,
  Alert,
  Snackbar,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Download as DownloadIcon,
  Description as DescriptionIcon,
  Assessment as AssessmentIcon,
  AccountBalance as AccountBalanceIcon,
  PieChart as PieChartIcon,
  Receipt as ReceiptIcon,
  TrendingUp as TrendingUpIcon,
  Backup as BackupIcon,
  TableChart as TableChartIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';
import ExportService from '../api/exportService';
import { useAuth } from '../context/AuthContext';
import { SageCard } from '../components/common';

// Report Card Component
const ReportCard = ({ title, description, icon, onClick, buttonText, buttonColor = 'primary', badge }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': {
          boxShadow: theme.shadows[4],
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: `${buttonColor}.light`,
              color: `${buttonColor}.main`,
            }}
          >
            {icon}
          </Box>
          {badge && (
            <Chip label={badge} size="small" color={buttonColor} variant="outlined" />
          )}
        </Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="outlined"
          color={buttonColor}
          startIcon={<DownloadIcon />}
          onClick={onClick}
        >
          {buttonText || 'Generate Report'}
        </Button>
      </CardActions>
    </Card>
  );
};

const Reports = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [format, setFormat] = useState('CSV');
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [loading, setLoading] = useState(false);

  const showMessage = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleExport = async (type) => {
    setLoading(true);
    showMessage('Generating report...', 'info');

    const payload = {
      userId: user.userId,
      format: format,
      startDate: startDate || null,
      endDate: endDate || null,
    };

    try {
      switch (type) {
        case 'TRANSACTIONS':
          await ExportService.exportTransactions(payload);
          break;
        case 'ACCOUNTS':
          await ExportService.exportAccounts({ ...payload, startDate: null, endDate: null });
          break;
        case 'BUDGETS':
          await ExportService.exportBudgets({ ...payload, startDate: null, endDate: null });
          break;
        case 'CATEGORIES':
          await ExportService.exportCategories({ ...payload, startDate: null, endDate: null });
          break;
        case 'ALL':
          await ExportService.exportAll({ ...payload, format: 'JSON' });
          break;
        default:
          break;
      }
      showMessage('Report generated successfully! Check your downloads.', 'success');
    } catch (error) {
      console.error('Export failed', error);
      showMessage('Failed to generate report. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={500}>
          Report Center
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Generate financial reports and export data in various formats
        </Typography>
      </Box>

      {/* Export Settings */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Export Settings
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Export Format</InputLabel>
              <Select
                value={format}
                label="Export Format"
                onChange={(e) => setFormat(e.target.value)}
              >
                <MenuItem value="CSV">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TableChartIcon fontSize="small" color="action" />
                    CSV (Comma Separated)
                  </Box>
                </MenuItem>
                <MenuItem value="EXCEL">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon fontSize="small" color="success" />
                    Excel Spreadsheet
                  </Box>
                </MenuItem>
                <MenuItem value="PDF">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon fontSize="small" color="error" />
                    PDF Document
                  </Box>
                </MenuItem>
                <MenuItem value="JSON">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon fontSize="small" color="warning" />
                    JSON (Data Export)
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Start Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="End Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Date filters apply to transaction reports only
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Report Categories */}
      <Grid container spacing={4}>
        {/* Financial Statements */}
        <Grid item xs={12} lg={6}>
          <SageCard
            title="Financial Statements"
            subtitle="Core accounting reports"
            accentColor="primary.main"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ReportCard
                  title="Transaction Listing"
                  description="Detailed list of all transactions within the selected date range"
                  icon={<ReceiptIcon />}
                  onClick={() => handleExport('TRANSACTIONS')}
                  buttonText="Export"
                  buttonColor="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ReportCard
                  title="Account Balances"
                  description="Current balances for all accounts in the system"
                  icon={<AccountBalanceIcon />}
                  onClick={() => handleExport('ACCOUNTS')}
                  buttonText="Export"
                  buttonColor="info"
                />
              </Grid>
            </Grid>
          </SageCard>
        </Grid>

        {/* Management Reports */}
        <Grid item xs={12} lg={6}>
          <SageCard
            title="Management Reports"
            subtitle="Analysis and planning tools"
            accentColor="secondary.main"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ReportCard
                  title="Budget Analysis"
                  description="Budget configurations, limits, and spending progress"
                  icon={<PieChartIcon />}
                  onClick={() => handleExport('BUDGETS')}
                  buttonText="Export"
                  buttonColor="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ReportCard
                  title="Category Summary"
                  description="All transaction categories and their classifications"
                  icon={<BarChartIcon />}
                  onClick={() => handleExport('CATEGORIES')}
                  buttonText="Export"
                  buttonColor="success"
                />
              </Grid>
            </Grid>
          </SageCard>
        </Grid>

        {/* Data Management */}
        <Grid item xs={12}>
          <SageCard
            title="Data Management"
            subtitle="Backup and data export options"
            accentColor="warning.main"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    bgcolor: 'warning.light',
                    border: 2,
                    borderColor: 'warning.main',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'warning.main',
                          color: 'warning.contrastText',
                        }}
                      >
                        <BackupIcon fontSize="large" />
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          Full System Backup
                        </Typography>
                        <Chip label="JSON Format" size="small" sx={{ mt: 0.5 }} />
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Export a complete backup of all your data including accounts, transactions,
                      categories, budgets, and settings. This file can be used for data recovery
                      or migration purposes.
                    </Typography>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Backup files are exported in JSON format for maximum compatibility
                    </Alert>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="warning"
                      size="large"
                      startIcon={<BackupIcon />}
                      onClick={() => handleExport('ALL')}
                      disabled={loading}
                    >
                      Download Complete Backup
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Export Tips
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Use <strong>CSV</strong> format for importing into spreadsheet applications
                    </Typography>
                    <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Use <strong>Excel</strong> format for formatted reports with multiple sheets
                    </Typography>
                    <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Use <strong>PDF</strong> format for printable reports and archiving
                    </Typography>
                    <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Use <strong>JSON</strong> format for data backup and integration
                    </Typography>
                    <Typography component="li" variant="body2" color="text.secondary">
                      Transaction reports respect the date range filter; other reports export all data
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </SageCard>
        </Grid>
      </Grid>

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Reports;

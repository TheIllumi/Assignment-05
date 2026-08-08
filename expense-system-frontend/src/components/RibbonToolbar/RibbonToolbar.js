import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Paper,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Dashboard as DashboardIcon,
  AccountBalance as AccountBalanceIcon,
  Receipt as ReceiptIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Help as HelpIcon,
  Add as AddIcon,
  SwapHoriz as SwapHorizIcon,
  MenuBook as MenuBookIcon,
  PieChart as PieChartIcon,
  Menu as MenuIcon,
  AccountBalanceWallet as WalletIcon,
  TrendingUp as TrendingUpIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useThemeMode } from '../../context/ThemeContext';
import RibbonButton from './RibbonButton';
import RibbonGroup from './RibbonGroup';
import RibbonDropdown from './RibbonDropdown';
import UserMenu from './UserMenu';

const RIBBON_TABS = [
  { id: 'home', label: 'Home', icon: <DashboardIcon /> },
  { id: 'banking', label: 'Banking', icon: <AccountBalanceIcon /> },
  { id: 'transactions', label: 'Transactions', icon: <ReceiptIcon /> },
  { id: 'accounting', label: 'Accounting', icon: <MenuBookIcon /> },
  { id: 'reports', label: 'Reports', icon: <AssessmentIcon /> },
];

const TAB_ACTIONS = {
  home: {
    groups: [
      {
        label: 'Navigate',
        items: [
          { type: 'button', label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
          { type: 'button', label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
        ],
      },
      {
        label: 'Quick Actions',
        items: [
          { type: 'button', label: 'New Transaction', action: 'newTransaction', icon: <AddIcon /> },
          { type: 'button', label: 'Transfer', path: '/transfers', icon: <SwapHorizIcon /> },
        ],
      },
    ],
  },
  banking: {
    groups: [
      {
        label: 'Accounts',
        items: [
          { type: 'button', label: 'All Accounts', path: '/accounts', icon: <AccountBalanceIcon /> },
          { type: 'button', label: 'Transfers', path: '/transfers', icon: <SwapHorizIcon /> },
        ],
      },
      {
        label: 'Management',
        items: [
          { type: 'button', label: 'Budgets', path: '/budgets', icon: <PieChartIcon /> },
        ],
      },
    ],
  },
  transactions: {
    groups: [
      {
        label: 'View',
        items: [
          { type: 'button', label: 'All Transactions', path: '/transactions', icon: <ReceiptIcon /> },
          { type: 'button', label: 'Transfers', path: '/transfers', icon: <SwapHorizIcon /> },
        ],
      },
      {
        label: 'Create',
        items: [
          { type: 'button', label: 'New Entry', action: 'newTransaction', icon: <AddIcon /> },
        ],
      },
    ],
  },
  accounting: {
    groups: [
      {
        label: 'Ledger',
        items: [
          { type: 'button', label: 'Chart of Accounts', path: '/chart-of-accounts', icon: <MenuBookIcon /> },
          { type: 'button', label: 'General Ledger', path: '/general-ledger', icon: <DescriptionIcon /> },
        ],
      },
      {
        label: 'Analysis',
        items: [
          { type: 'button', label: 'Budgets', path: '/budgets', icon: <PieChartIcon /> },
        ],
      },
    ],
  },
  reports: {
    groups: [
      {
        label: 'Financial',
        items: [
          { type: 'button', label: 'Reports Center', path: '/reports', icon: <AssessmentIcon /> },
        ],
      },
      {
        label: 'Analysis',
        items: [
          { type: 'dropdown', label: 'Export', icon: <TrendingUpIcon />, items: [
            { label: 'Export Transactions', path: '/reports' },
            { label: 'Export Accounts', path: '/reports' },
            { label: 'Export All Data', path: '/reports' },
          ]},
        ],
      },
    ],
  },
};

const RibbonToolbar = ({ onNewTransaction }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine active tab based on current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/' || path === '/settings') return 'home';
    if (path === '/accounts' || path === '/transfers') return 'banking';
    if (path === '/transactions') return 'transactions';
    if (path === '/chart-of-accounts' || path === '/general-ledger' || path === '/budgets') return 'accounting';
    if (path === '/reports') return 'reports';
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleActionClick = (item) => {
    if (item.action === 'newTransaction' && onNewTransaction) {
      onNewTransaction();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const currentTabActions = TAB_ACTIONS[activeTab];

  // Mobile navigation items
  const mobileNavItems = [
    { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { label: 'Accounts', path: '/accounts', icon: <AccountBalanceIcon /> },
    { label: 'Transactions', path: '/transactions', icon: <ReceiptIcon /> },
    { label: 'Transfers', path: '/transfers', icon: <SwapHorizIcon /> },
    { label: 'Budgets', path: '/budgets', icon: <PieChartIcon /> },
    { label: 'Chart of Accounts', path: '/chart-of-accounts', icon: <MenuBookIcon /> },
    { label: 'General Ledger', path: '/general-ledger', icon: <DescriptionIcon /> },
    { label: 'Reports', path: '/reports', icon: <AssessmentIcon /> },
    { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
  ];

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: theme.zIndex.appBar }}>
      {/* Primary Ribbon Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'background.ribbon',
        }}
      >
        <Toolbar variant="dense" sx={{ minHeight: 48, px: { xs: 1, sm: 2 } }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo Area */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 3,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <WalletIcon sx={{ fontSize: 28, mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '1.1rem',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              ExpenseManager
            </Typography>
          </Box>

          {/* Ribbon Tabs - Desktop Only */}
          {!isMobile && (
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                minHeight: 48,
                '& .MuiTabs-indicator': {
                  bgcolor: 'white',
                  height: 3,
                },
              }}
            >
              {RIBBON_TABS.map((tab) => (
                <Tab
                  key={tab.id}
                  value={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  iconPosition="start"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    minHeight: 48,
                    px: 2,
                    '&.Mui-selected': {
                      color: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: 20,
                      mr: 0.5,
                    },
                  }}
                />
              ))}
            </Tabs>
          )}

          {/* Right Side Actions */}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                size="small"
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Help">
              <IconButton
                color="inherit"
                size="small"
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>

            <UserMenu user={user} onLogout={logout} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Secondary Action Bar - Desktop Only */}
      {!isMobile && (
        <Paper
          square
          elevation={1}
          sx={{
            bgcolor: 'background.ribbonSecondary',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Toolbar
            variant="dense"
            sx={{
              minHeight: 52,
              px: 2,
              gap: 0,
            }}
          >
            {currentTabActions?.groups.map((group, groupIndex) => (
              <RibbonGroup
                key={groupIndex}
                label={group.label}
                showDivider={groupIndex < currentTabActions.groups.length - 1}
              >
                {group.items.map((item, itemIndex) => (
                  item.type === 'dropdown' ? (
                    <RibbonDropdown
                      key={itemIndex}
                      label={item.label}
                      icon={item.icon}
                      items={item.items}
                    />
                  ) : (
                    <RibbonButton
                      key={itemIndex}
                      label={item.label}
                      icon={item.icon}
                      onClick={() => handleActionClick(item)}
                      variant="vertical"
                    />
                  )
                ))}
              </RibbonGroup>
            ))}
          </Toolbar>
        </Paper>
      )}

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WalletIcon />
            <Typography variant="h6" fontWeight={600}>
              ExpenseManager
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {user?.email}
          </Typography>
        </Box>

        <List>
          {mobileNavItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </ListItemIcon>
              <ListItemText primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={logout} sx={{ color: 'error.main' }}>
              <ListItemIcon sx={{ color: 'error.main' }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default RibbonToolbar;

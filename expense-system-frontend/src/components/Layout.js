import React, { useState } from 'react';
import { Box, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { RibbonToolbar } from './RibbonToolbar';
import StatusBar from './StatusBar';
import TransactionDialog from './TransactionDialog';

// Ribbon heights: Primary (48px) + Secondary (52px) = 100px
const RIBBON_HEIGHT = 100;
const RIBBON_HEIGHT_MOBILE = 48; // Only primary bar on mobile
const STATUS_BAR_HEIGHT = 24;

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);

  const ribbonHeight = isMobile ? RIBBON_HEIGHT_MOBILE : RIBBON_HEIGHT;

  const handleNewTransaction = () => {
    setTransactionDialogOpen(true);
  };

  const handleTransactionDialogClose = () => {
    setTransactionDialogOpen(false);
  };

  const handleTransactionSuccess = () => {
    setTransactionDialogOpen(false);
    // Optionally trigger a refresh of data
    window.dispatchEvent(new CustomEvent('transactionCreated'));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Ribbon Toolbar */}
      <RibbonToolbar onNewTransaction={handleNewTransaction} />

      {/* Spacer for fixed ribbon */}
      <Box sx={{ height: ribbonHeight, flexShrink: 0 }} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mb: `${STATUS_BAR_HEIGHT}px`,
          p: { xs: 2, sm: 3 },
          minHeight: `calc(100vh - ${ribbonHeight}px - ${STATUS_BAR_HEIGHT}px)`,
          overflow: 'auto',
        }}
      >
        <Container
          maxWidth="xl"
          disableGutters
          sx={{
            px: { xs: 0, sm: 1 },
          }}
        >
          {children}
        </Container>
      </Box>

      {/* Status Bar */}
      <StatusBar />

      {/* Transaction Dialog */}
      <TransactionDialog
        open={transactionDialogOpen}
        onClose={handleTransactionDialogClose}
        onSuccess={handleTransactionSuccess}
      />
    </Box>
  );
};

export default Layout;

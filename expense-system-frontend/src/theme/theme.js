import { createTheme } from '@mui/material/styles';

// Sage 50cloud Authentic Color Palette
const sageColors = {
  // Primary brand colors
  teal: {
    main: '#00838F',
    light: '#4FB3BF',
    dark: '#005662',
  },
  green: {
    main: '#2E7D32',
    light: '#60AD5E',
    dark: '#005005',
  },
  // Semantic colors
  income: '#2E7D32',
  expense: '#C62828',
  neutral: '#1565C0',
  warning: '#EF6C00',
  // Greys
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

// Light Theme
export const getLightTheme = () => createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: sageColors.teal.main,
      light: sageColors.teal.light,
      dark: sageColors.teal.dark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: sageColors.green.main,
      light: sageColors.green.light,
      dark: sageColors.green.dark,
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
      ribbon: sageColors.teal.main,
      ribbonSecondary: '#FAFAFA',
    },
    text: {
      primary: sageColors.grey[900],
      secondary: sageColors.grey[600],
    },
    success: {
      main: sageColors.income,
      light: '#81C784',
      dark: '#1B5E20',
    },
    error: {
      main: sageColors.expense,
      light: '#EF5350',
      dark: '#B71C1C',
    },
    warning: {
      main: sageColors.warning,
      light: '#FFB74D',
      dark: '#E65100',
    },
    info: {
      main: sageColors.neutral,
      light: '#64B5F6',
      dark: '#0D47A1',
    },
    divider: sageColors.grey[300],
    // Custom accounting colors
    accounting: {
      income: sageColors.income,
      expense: sageColors.expense,
      neutral: sageColors.neutral,
      asset: '#1565C0',
      liability: '#C62828',
      equity: '#7B1FA2',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.01em' },
    h2: { fontSize: '1.75rem', fontWeight: 500, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.5rem', fontWeight: 500 },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    h5: { fontSize: '1.1rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
    subtitle1: { fontSize: '1rem', fontWeight: 500 },
    subtitle2: { fontSize: '0.875rem', fontWeight: 500 },
    body1: { fontSize: '0.875rem', lineHeight: 1.5 },
    body2: { fontSize: '0.813rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 500 },
    caption: { fontSize: '0.75rem', color: sageColors.grey[600] },
    overline: { fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em' },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0,0,0,0.05)',
    '0 1px 3px rgba(0,0,0,0.1)',
    '0 2px 4px rgba(0,0,0,0.1)',
    '0 3px 6px rgba(0,0,0,0.1)',
    '0 4px 8px rgba(0,0,0,0.1)',
    '0 6px 12px rgba(0,0,0,0.1)',
    '0 8px 16px rgba(0,0,0,0.1)',
    '0 10px 20px rgba(0,0,0,0.1)',
    '0 12px 24px rgba(0,0,0,0.1)',
    '0 14px 28px rgba(0,0,0,0.1)',
    '0 16px 32px rgba(0,0,0,0.1)',
    '0 18px 36px rgba(0,0,0,0.1)',
    '0 20px 40px rgba(0,0,0,0.1)',
    '0 22px 44px rgba(0,0,0,0.1)',
    '0 24px 48px rgba(0,0,0,0.1)',
    '0 26px 52px rgba(0,0,0,0.1)',
    '0 28px 56px rgba(0,0,0,0.1)',
    '0 30px 60px rgba(0,0,0,0.1)',
    '0 32px 64px rgba(0,0,0,0.1)',
    '0 34px 68px rgba(0,0,0,0.1)',
    '0 36px 72px rgba(0,0,0,0.1)',
    '0 38px 76px rgba(0,0,0,0.1)',
    '0 40px 80px rgba(0,0,0,0.1)',
    '0 42px 84px rgba(0,0,0,0.1)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#F5F5F5',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#BDBDBD',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#9E9E9E',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '6px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: sageColors.teal.dark,
          },
        },
        outlined: {
          borderWidth: '1px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: sageColors.teal.main,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        dense: {
          minHeight: 48,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FAFAFA',
          borderRight: `1px solid ${sageColors.grey[300]}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: `1px solid ${sageColors.grey[200]}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${sageColors.grey[200]}`,
          padding: '12px 16px',
        },
        head: {
          backgroundColor: '#E0F2F1',
          color: sageColors.grey[900],
          fontWeight: 600,
          borderBottom: `2px solid ${sageColors.teal.main}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: sageColors.grey[50],
          },
          '&:hover': {
            backgroundColor: '#E0F7FA !important',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          minHeight: 48,
          padding: '12px 24px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        colorSuccess: {
          backgroundColor: '#E8F5E9',
          color: sageColors.income,
        },
        colorError: {
          backgroundColor: '#FFEBEE',
          color: sageColors.expense,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: sageColors.teal.light,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: sageColors.teal.main,
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: sageColors.teal.main,
          color: '#FFFFFF',
          padding: '16px 24px',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: `1px solid ${sageColors.grey[200]}`,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: sageColors.grey[50],
          borderBottom: `1px solid ${sageColors.grey[200]}`,
          '&.Mui-expanded': {
            minHeight: 48,
          },
        },
        content: {
          '&.Mui-expanded': {
            margin: '12px 0',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#E0F2F1',
            borderLeft: `4px solid ${sageColors.teal.main}`,
            '&:hover': {
              backgroundColor: '#B2DFDB',
            },
          },
          '&:hover': {
            backgroundColor: '#E0F7FA',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: '#E8F5E9',
          color: sageColors.income,
        },
        standardError: {
          backgroundColor: '#FFEBEE',
          color: sageColors.expense,
        },
        standardWarning: {
          backgroundColor: '#FFF3E0',
          color: sageColors.warning,
        },
        standardInfo: {
          backgroundColor: '#E3F2FD',
          color: sageColors.neutral,
        },
      },
    },
  },
});

// Dark Theme
export const getDarkTheme = () => createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4DD0E1',
      light: '#88FFFF',
      dark: '#009FAF',
      contrastText: '#000000',
    },
    secondary: {
      main: '#81C784',
      light: '#B2FAB4',
      dark: '#519657',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
      ribbon: '#1A1A2E',
      ribbonSecondary: '#252525',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    success: {
      main: '#81C784',
      light: '#B2FAB4',
      dark: '#519657',
    },
    error: {
      main: '#EF5350',
      light: '#FF867C',
      dark: '#B61827',
    },
    warning: {
      main: '#FFB74D',
      light: '#FFE97D',
      dark: '#C88719',
    },
    info: {
      main: '#64B5F6',
      light: '#9BE7FF',
      dark: '#2286C3',
    },
    divider: '#424242',
    // Custom accounting colors (dark mode variants)
    accounting: {
      income: '#81C784',
      expense: '#EF5350',
      neutral: '#64B5F6',
      asset: '#64B5F6',
      liability: '#EF5350',
      equity: '#BA68C8',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.01em' },
    h2: { fontSize: '1.75rem', fontWeight: 500, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.5rem', fontWeight: 500 },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    h5: { fontSize: '1.1rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
    subtitle1: { fontSize: '1rem', fontWeight: 500 },
    subtitle2: { fontSize: '0.875rem', fontWeight: 500 },
    body1: { fontSize: '0.875rem', lineHeight: 1.5 },
    body2: { fontSize: '0.813rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 500 },
    caption: { fontSize: '0.75rem' },
    overline: { fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em' },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#1E1E1E',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#424242',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#616161',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '6px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
          },
        },
        containedPrimary: {
          backgroundColor: '#4DD0E1',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#009FAF',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A2E',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        dense: {
          minHeight: 48,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E1E1E',
          borderRight: '1px solid #424242',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          border: '1px solid #333333',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1E1E1E',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #424242',
          padding: '12px 16px',
        },
        head: {
          backgroundColor: '#252525',
          color: '#FFFFFF',
          fontWeight: 600,
          borderBottom: '2px solid #4DD0E1',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: '#252525',
          },
          '&:hover': {
            backgroundColor: '#2A2A3E !important',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          minHeight: 48,
          padding: '12px 24px',
          color: '#B0B0B0',
          '&.Mui-selected': {
            color: '#4DD0E1',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          backgroundColor: '#4DD0E1',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        colorSuccess: {
          backgroundColor: 'rgba(129, 199, 132, 0.2)',
          color: '#81C784',
        },
        colorError: {
          backgroundColor: 'rgba(239, 83, 80, 0.2)',
          color: '#EF5350',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4DD0E1',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4DD0E1',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          backgroundColor: '#1E1E1E',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A2E',
          color: '#FFFFFF',
          padding: '16px 24px',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          border: '1px solid #424242',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: '#252525',
          borderBottom: '1px solid #424242',
          '&.Mui-expanded': {
            minHeight: 48,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(77, 208, 225, 0.15)',
            borderLeft: '4px solid #4DD0E1',
            '&:hover': {
              backgroundColor: 'rgba(77, 208, 225, 0.25)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(77, 208, 225, 0.1)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: 'rgba(129, 199, 132, 0.15)',
          color: '#81C784',
        },
        standardError: {
          backgroundColor: 'rgba(239, 83, 80, 0.15)',
          color: '#EF5350',
        },
        standardWarning: {
          backgroundColor: 'rgba(255, 183, 77, 0.15)',
          color: '#FFB74D',
        },
        standardInfo: {
          backgroundColor: 'rgba(100, 181, 246, 0.15)',
          color: '#64B5F6',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#B0B0B0',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#252525',
          border: '1px solid #424242',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(77, 208, 225, 0.1)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(77, 208, 225, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(77, 208, 225, 0.25)',
            },
          },
        },
      },
    },
  },
});

// Default export for backward compatibility
const theme = getLightTheme();
export default theme;

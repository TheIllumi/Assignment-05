import React, { useEffect, useState } from 'react';
import { 
    Box, Typography, Paper, Grid, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Chip, Accordion, 
    AccordionSummary, AccordionDetails, CircularProgress, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChartOfAccountsService from '../api/chartOfAccountsService';
import { useAuth } from '../context/AuthContext';

const AccountSection = ({ title, items, total, color, expanded = true }) => {
    if (!items || items.length === 0) return null;

    return (
        <Accordion defaultExpanded={expanded} sx={{ mb: 2, borderLeft: `6px solid ${color}` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', pr: 2 }}>
                    <Typography variant="h6">{title}</Typography>
                    {total !== undefined && (
                        <Typography variant="h6" fontWeight="bold">
                            {total < 0 ? '-' : ''}PKR {Math.abs(total).toLocaleString()}
                        </Typography>
                    )}
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
                <TableContainer>
                    <Table size="small">
                        <TableHead sx={{ bgcolor: 'action.hover' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Account Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Sub-Type</TableCell>
                                {total !== undefined && <TableCell align="right" sx={{ fontWeight: 'bold' }}>Balance</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.code} hover>
                                    <TableCell sx={{ fontFamily: 'monospace' }}>{item.code}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <Chip label={item.subType} size="small" variant="outlined" />
                                    </TableCell>
                                    {total !== undefined && (
                                        <TableCell align="right">
                                            {item.currency} {item.balance?.toLocaleString()}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};

const ChartOfAccounts = () => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            ChartOfAccountsService.getChartOfAccounts(user.userId)
                .then(setData)
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [user]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
    if (!data) return <Typography color="error">Failed to load Chart of Accounts</Typography>;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Chart of Accounts</Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                A complete listing of all accounts used in the system, categorized by financial type.
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                    <Typography variant="h5" color="primary" gutterBottom sx={{ mt: 2 }}>Balance Sheet Accounts</Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <AccountSection 
                        title="Assets" 
                        items={data.assets} 
                        total={data.totalAssets} 
                        color="#4caf50" 
                    />
                    
                    <AccountSection 
                        title="Liabilities" 
                        items={data.liabilities} 
                        total={data.totalLiabilities} 
                        color="#f44336" 
                    />

                    <Paper sx={{ p: 2, bgcolor: '#f5f5f5', mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6">Net Worth (Equity)</Typography>
                            <Typography variant="h5" color={data.netWorth >= 0 ? 'success.main' : 'error.main'} fontWeight="bold">
                                PKR {data.netWorth?.toLocaleString()}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Typography variant="h5" color="primary" gutterBottom sx={{ mt: 2 }}>Income Statement Accounts</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <AccountSection 
                        title="Revenue (Income)" 
                        items={data.income} 
                        color="#2196f3" 
                    />

                    <AccountSection 
                        title="Expenses" 
                        items={data.expenses} 
                        color="#ff9800" 
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChartOfAccounts;

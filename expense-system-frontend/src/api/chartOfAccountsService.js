import api from './axios';

const ChartOfAccountsService = {
    getChartOfAccounts: async (userId) => {
        const response = await api.get('/chartOfAccounts', { params: { userId } });
        return response.data;
    }
};

export default ChartOfAccountsService;

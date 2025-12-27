import api from './axios';

const PaymentMethodsService = {
    getAll: async (userId) => {
        const response = await api.get('/paymentMethods', { params: { userId } });
        if (response.data && response.data.content && Array.isArray(response.data.content)) {
            return response.data.content;
        }
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/paymentMethods', data);
        return response.data;
    },
    delete: async (id) => {
        await api.delete(`/paymentMethods/${id}`);
    }
};

export default PaymentMethodsService;
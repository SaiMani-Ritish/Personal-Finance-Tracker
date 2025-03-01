import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const expenseService = {
    getAllExpenses: async () => {
        const response = await axios.get(`${BASE_URL}/expense/list`);
        return response.data;
    },

    addExpense: async (expenseData) => {
        const response = await axios.post(`${BASE_URL}/expense/add`, expenseData);
        return response.data;
    },

    updateExpense: async (id, expenseData) => {
        const response = await axios.put(`${BASE_URL}/expense/update/${id}`, expenseData);
        return response.data;
    },

    deleteExpense: async (id) => {
        const response = await axios.delete(`${BASE_URL}/expense/delete/${id}`);
        return response.data;
    }
};

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/budget';

export const budgetService = {
    async updateBudget(budgetData) {
        const response = await axios.post(`${API_URL}/update`, budgetData);
        return response.data;
    },

    async getBudget() {
        const response = await axios.get(`${API_URL}/details`);
        return response.data;
    }
};

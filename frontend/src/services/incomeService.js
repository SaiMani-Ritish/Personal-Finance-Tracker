import axios from 'axios';

const API_URL = 'http://localhost:8080/api/income';

export const incomeService = {
    async addIncome(incomeData) {
        const response = await axios.post(`${API_URL}/add`, incomeData);
        return response.data;
    },

    async getAllIncomes() {
        const response = await axios.get(`${API_URL}/list`);
        return response.data;
    }
};

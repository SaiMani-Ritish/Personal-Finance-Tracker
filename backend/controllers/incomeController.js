const Income = require('../models/income');

// Add new income
const addIncome = async (req, res) => {
    try {
        const { amount, source, description } = req.body;
        const income = new Income({
            amount,
            source,
            description
        });
        await income.save();
        res.status(201).json({ success: true, data: income });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get list of incomes
const getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ date: -1 });
        const total = incomes.reduce((sum, income) => sum + income.amount, 0);
        res.status(200).json({ success: true, data: incomes, total });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = {
    addIncome,
    getIncomes
};

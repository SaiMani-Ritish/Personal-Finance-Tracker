const Budget = require('../models/budget');
const { v4: uuidv4 } = require('uuid');

// Update monthly income and add/update goals
const updateBudget = async (req, res) => {
    try {
        const { monthlyIncome, goals } = req.body;
        
        // Find existing budget or create new one
        let budget = await Budget.findOne();
        if (!budget) {
            budget = new Budget();
        }

        // Update monthly income if provided
        if (monthlyIncome !== undefined) {
            budget.income = monthlyIncome;
        }

        // Update goals if provided
        if (goals && goals.length > 0) {
            budget.goals = goals.map(goal => ({
                id: goal.id || uuidv4(),
                name: goal.name,
                amount: goal.amount,
                deadline: goal.deadline,
                monthlySavingRequired: goal.monthlySavingRequired
            }));
        }

        await budget.save();
        res.status(200).json({ success: true, data: budget });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get budget details including goals
const getBudget = async (req, res) => {
    try {
        const budget = await Budget.findOne();
        if (!budget) {
            return res.status(404).json({ success: false, error: 'Budget not found' });
        }
        res.status(200).json({ success: true, data: budget });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = {
    updateBudget,
    getBudget
};

const express = require('express');
const router = express.Router();
const { 
    addExpense,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenses,
    getExpensesSummary,
} = require('../controllers/expenseController');

// Public routes
router.post('/add', addExpense);       // Add New Expense
router.put('/update/:id', updateExpense);  // Update Expense
router.delete('/delete/:id', deleteExpense); // Delete Expense

router.get('/list', getExpenses); // GET /api/expenses

// Dashboard Summary Route
router.get('/summary', getExpensesSummary); // Fetch Expenses Summary for Dashboard

router.get('/:id', getExpenseById); // GET /api/expenses/:id

module.exports = router;

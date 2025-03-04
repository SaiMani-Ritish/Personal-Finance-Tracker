const express = require('express');
const router = express.Router();
const { 
    addExpense, 
    getExpenseById, 
    updateExpense, 
    deleteExpense, 
    getExpenses, 
    getExpensesSummary 
} = require('../controllers/expenseController');

// Public routes
router.post('/add', addExpense);       // Add New Expense
router.put('/update/:id', updateExpense);  // Update Expense
router.delete('/delete/:id', deleteExpense); // Delete Expense

// Protected routes
router.get('/list', getExpenses);      // Fetch All Expenses
router.get('/:id', getExpenseById);    // Fetch Expense by ID

// Dashboard Summary Route
router.get('/summary', getExpensesSummary); // Fetch Expenses Summary for Dashboard

module.exports = router;

const express = require('express');
const router = express.Router();
const { addExpense, getExpenseById, updateExpense, deleteExpense, getExpenses} = require('../controllers/expenseController');

// Public routes
router.post('/add', addExpense);    // POST /api/expenses
router.put('/update/:id', updateExpense); // PUT /api/expenses/:id
router.delete('/delete/:id', deleteExpense);    // DELETE /api/expenses/:id

// Protected routes
router.get('/list', getExpenses); // GET /api/expenses
router.get('/:id', getExpenseById); // GET /api/expenses/:id

module.exports = router;

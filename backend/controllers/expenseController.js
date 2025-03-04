const Expense = require('../models/expense');
const jwt = require('jsonwebtoken');
const { TIME_CONSTANTS } = require('../constants/constants');

// Register new expense
exports.addExpense = async (req, res) => {
  try {
    const { userId, amount, category, description, date } = req.body;

    const expense = new Expense({
      userId,
      amount,
      category,
      description,
      date
    });

    await expense.save();

    res.status(201).json({
      message: 'Expense registered successfully',
      expense: {
        userId: expense.userId,
        id: expense._id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering expense', error: error.message });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const updatedExpense = req.body;

    const expense = await Expense.findByIdAndUpdate(expenseId, updatedExpense, { new: true });

    if (!expense) {
      return res.status(404).send({ message: 'Expense not found' });
    }

    res.send({ message: 'Expense updated successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error updating expense' });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const expense = await Expense.findByIdAndDelete(expenseId);

    if (!expense) {
      return res.status(404).send({ message: 'Expense not found' });
    }

    res.send({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting expense' });
  }
};

// Get expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expense', error: error.message });
  }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
};

// Expense Summary for Dashboard (New API)
exports.getExpensesSummary = async (req, res) => {
  try {
    const expenses = await Expense.find();

    const summary = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses summary', error: error.message });
  }
};

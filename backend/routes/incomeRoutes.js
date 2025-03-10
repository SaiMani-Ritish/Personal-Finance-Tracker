const express = require('express');
const router = express.Router();
const { addIncome, getIncomes } = require('../controllers/incomeController');

// Public routes
router.post('/add', addIncome);
router.get('/list', getIncomes);

module.exports = router;

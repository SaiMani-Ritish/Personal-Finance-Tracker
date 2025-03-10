const express = require('express');
const router = express.Router();
const { updateBudget, getBudget } = require('../controllers/budgetController');

// Public routes
router.post('/update', updateBudget);
router.get('/details', getBudget);

module.exports = router;

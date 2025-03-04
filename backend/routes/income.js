const express = require('express');
const router = express.Router();
const Income = require('../models/income');

// Get All Income for Dashboard
router.get('/', async (req, res) => {
    try {
        const incomes = await Income.find();
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

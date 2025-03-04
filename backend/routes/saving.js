const express = require('express');
const router = express.Router();
const Saving = require('../models/saving');

// Get All Savings for Dashboard
router.get('/', async (req, res) => {
    try {
        const savings = await Saving.find();
        res.json(savings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

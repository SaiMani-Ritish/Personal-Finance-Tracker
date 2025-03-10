const express = require('express');
const router = express.Router();
const { 
    chat
} = require('../controllers/chatController');

// Public routes
router.post('/ask', chat);

module.exports = router;

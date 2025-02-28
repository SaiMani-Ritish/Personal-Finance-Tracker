const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', registerUser); // POST /api/userregister
router.post('/login', loginUser); // POST /api/userlogin

// Protected routes
router.get('/profile', auth, getUserProfile); // GET /api/userprofile

module.exports = router;

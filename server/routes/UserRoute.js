// Imports
const express = require('express');
const { registerUser, loginUser, getProfile,verifyOTP } = require('../controllers/UserController.js');

// Router Setup
const router = express.Router();

// Register 
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get Profile
router.post('/profile', getProfile);

// Verify OTP
router.post('/verifyOTP', verifyOTP)

// Export
module.exports = router;
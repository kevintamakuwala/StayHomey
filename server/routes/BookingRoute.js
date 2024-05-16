// Imports
const express = require('express');
const { getBookings, postBookings } = require('../controllers/BookingController.js');
const router = express.Router();

// Get All Bookings
router.get('/', getBookings)

// Add Bookings
router.post('/', postBookings)

// Exports
module.exports = router;

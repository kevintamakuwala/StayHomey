// Imports
const express = require('express');
const { addReview, getReview } = require('../controllers/ReviewController')
// Router Setup
const router = express.Router();

// Add Review 
router.post('/addReview', addReview);

// Get A review of a post
router.get('/getReview', getReview);

// Exporting
module.exports = router;
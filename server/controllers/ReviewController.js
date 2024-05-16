const Reviews = require('../models/ReviewModel');

// Get All Bookings
const getReview = async (req, res) => {
    res.json(await Reviews.find());
}

// Add a new Review
const addReview = async (req, res) => {
    const { place, review } = req.body;
    try {
        const rev = await Reviews.rate(place, review)
        res.status(200).json({ rev })
    } catch (error) {
        res.status(200).json({ error: error.message })
    }
}

module.exports = { getReview, addReview }
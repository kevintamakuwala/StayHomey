// Imports
const mongoose = require('mongoose');

// Schema
const reviewSchema = new mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
    review: String,
});

// Rate Function
reviewSchema.statics.rate = async function (place, rating) {
    if (!rating) {
        throw Error('Empty Review Not Allowed')
    }
    const review = await this.create({ place, review: rating })
    return review
}

// Model
const reviewModel = mongoose.model('Reviews', reviewSchema);

// Export
module.exports = reviewModel;


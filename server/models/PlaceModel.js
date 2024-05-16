// Imports
const mongoose = require('mongoose');

// Schema
const placeSchema = new mongoose.Schema({
  owner: String,
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
});

// Model
const PlaceModel = mongoose.model('Place', placeSchema);

// Export
module.exports = PlaceModel;
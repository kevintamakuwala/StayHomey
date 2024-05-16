// Imports 
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema
const UserOTPverificationSchema = new Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

// Model
const UserOTPverification = mongoose.model('UserOTPverification', UserOTPverificationSchema);

// Export
module.exports = UserOTPverification;
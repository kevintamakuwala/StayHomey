// Imports
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')
const validator = require('validator');

// Schema
const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  verified: Boolean,
});

// Register Function
UserSchema.statics.register = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Enter a valid Email')
  }
  if (!validator.isStrongPassword(password, { minLength: 8, minNumbers: 1, minUppercase: 1, minLowercase: 1, minSymbols: 0 })) {
    throw Error('Enter a Strong Password (min-lenght=8, uppercase=1,lowercase=1, numbers=1)')
  }

  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({ name, email, password: hash, verified:false })

  return user
}

// Login Function
UserSchema.statics.login = async function (email, password) {
  // Validating
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  const user = await this.findOne({ email })
  if (!user) {
    throw Error('User does not exist')
  }
  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect Password')
  }
  return user
}

// Model
const UserModel = mongoose.model('User', UserSchema);

// Export
module.exports = UserModel;
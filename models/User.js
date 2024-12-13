const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    // Add fields like budget, room size, etc.
    budget: Number,
    location: String,
    // Add more as needed
  },
  // Additional fields can be added here
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

// models/EstateAgent.js
const mongoose = require('mongoose');

const EstateAgentSchema = new mongoose.Schema({
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
  agencyName: {
    type: String,
    required: true,
  },
  // Additional fields can be added here
}, { timestamps: true });

module.exports = mongoose.model('EstateAgent', EstateAgentSchema);

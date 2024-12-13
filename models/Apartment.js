const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableRooms: {
    type: Number,
    default: 1,
  },
  listedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EstateAgent',
    required: true,
  },
  // Additional fields like amenities can be added here
}, { timestamps: true });

module.exports = mongoose.model('Apartment', ApartmentSchema);

// routes/apartments.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Apartment = require('../models/Apartment');
const EstateAgent = require('../models/EstateAgent');

// @route   POST api/apartments
// @desc    Create a new apartment listing
// @access  Private (Estate Agents only)
router.post('/', auth, async (req, res) => {
  try {
    const agent = await EstateAgent.findById(req.user.id);
    if (!agent) {
      return res.status(401).json({ msg: 'Estate Agent not found' });
    }

    const { title, description, location, price, availableRooms } = req.body;

    const newApartment = new Apartment({
      title,
      description,
      location,
      price,
      availableRooms,
      listedBy: agent.id,
    });

    const apartment = await newApartment.save();
    res.json(apartment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/apartments
// @desc    Get all apartment listings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const apartments = await Apartment.find().populate('listedBy', ['agencyName', 'email']);
    res.json(apartments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/apartments/:id
// @desc    Get apartment by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id).populate('listedBy', ['agencyName', 'email']);

    if (!apartment) {
      return res.status(404).json({ msg: 'Apartment not found' });
    }

    res.json(apartment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Apartment not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;

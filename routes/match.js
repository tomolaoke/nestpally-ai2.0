// routes/match.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const User = require('../models/User');
const Apartment = require('../models/Apartment');
const EstateAgent = require('../models/EstateAgent');

// @route   GET api/match/roommates
// @desc    Get matching roommates based on preferences
// @access  Private
router.get('/roommates', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Simple matching: find users with similar preferences and location
    const matches = await User.find({
      _id: { $ne: currentUser.id },
      'preferences.location': currentUser.preferences.location,
      'preferences.budget': { $gte: currentUser.preferences.budget - 100, $lte: currentUser.preferences.budget + 100 },
    }).select('-password');

    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/match/apartments
// @desc    Get matching apartments based on user preferences
// @access  Private
router.get('/apartments', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Simple matching: find apartments in the preferred location and within budget
    const matches = await Apartment.find({
      location: currentUser.preferences.location,
      price: { $lte: currentUser.preferences.budget },
    }).populate('listedBy', ['agencyName', 'email']);

    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/match/estateAgents
// @desc    Get matching estate agents based on location
// @access  Private
router.get('/estateAgents', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Simple matching: find estate agents who have listings in the preferred location
    const matchingApartments = await Apartment.find({ location: currentUser.preferences.location });
    const agentIds = matchingApartments.map(apartment => apartment.listedBy);
    const uniqueAgentIds = [...new Set(agentIds.map(id => id.toString()))];

    const agents = await EstateAgent.find({ _id: { $in: uniqueAgentIds } }).select('-password');

    res.json(agents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

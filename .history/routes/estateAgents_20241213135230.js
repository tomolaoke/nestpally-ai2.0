// routes/estateAgents.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const auth = require('../middleware/auth');

const EstateAgent = require('../models/EstateAgent');

dotenv.config();

// @route   POST api/estateAgents/register
// @desc    Register estate agent
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password, agencyName } = req.body;

  try {
    let agent = await EstateAgent.findOne({ email });
    if (agent) {
      return res.status(400).json({ msg: 'Estate Agent already exists' });
    }

    agent = new EstateAgent({
      name,
      email,
      password,
      agencyName,
    });

    const salt = await bcrypt.genSalt(10);
    agent.password = await bcrypt.hash(password, salt);

    await agent.save();

    const payload = {
      user: {
        id: agent.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/estateAgents/login
// @desc    Authenticate estate agent & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let agent = await EstateAgent.findOne({ email });
    if (!agent) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: agent.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/estateAgents/me
// @desc    Get estate agent data
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const agent = await EstateAgent.findById(req.user.id).select('-password');
    res.json(agent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

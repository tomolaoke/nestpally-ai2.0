// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {

})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  const path = require('path');

  app.use(express.static(path.join(__dirname, 'public')));


// Define Routes (to be added later)
const users = require('./routes/users');

app.use('/api/users', users);

const estateAgents = require('./routes/estateAgents');

app.use('/api/estateAgents', estateAgents);

const apartments = require('./routes/apartments');

app.use('/api/apartments', apartments);

// server.js (Add the following lines)

const match = require('./routes/match');

app.use('/api/match', match);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// MongoDB Schema
const userSchema = new mongoose.Schema({
  walletAddress: String,
  twitterId: String,
  airdropAmount: Number,
  timestamp: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

app.get('/metrics', async (req, res) => {
  try {
    const now = new Date();
    const isPreLaunch = now < new Date(process.env.LAUNCH_DATE || '2025-05-30');
    const users = await User.find();
    const metrics = {
      status: isPreLaunch ? 'Launch Status: Imminent' : 'STRON Launched!',
      totalUsers: users.length,
      totalAirdrops: users.reduce((sum, user) => sum + (user.airdropAmount || 0), 0),
      lastPost: users.sort((a, b) => b.timestamp - a.timestamp)[0]?.timestamp || 'N/A',
    };
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(console.error);
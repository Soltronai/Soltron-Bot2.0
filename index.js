require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { TwitterApi } = require('twitter-api-v2');

const app = express();
const port = process.env.PORT || 3000;

// Twitter client
const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

// MongoDB setup
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const MetricSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  followers: Number,
  tweets: Number,
  interactions: Number,
  runtime: Number, // Seconds since start
});
const Metric = mongoose.model('Metric', MetricSchema);

// Bot start time
const startTime = new Date();

// Serve static dashboard
app.use(express.static('public'));

// Metrics endpoint
// Add after /metrics endpoint
app.get('/test-api', async (req, res) => {
  try {
    const user = await client.v2.me();
    const tweetTest = await client.v2.tweet('Soltron test tweet #STRON');
    res.json({ status: 'success', user: user.data.username, tweet: tweetTest.data });
  } catch (err) {
    console.error('API test error:', err.message, err.errors || '');
    res.status(500).json({ error: err.message, details: err.errors });
  }
});
app.get('/metrics', async (req, res) => {
  try {
    // Fetch X data
    const user = await client.v2.me({ 'user.fields': 'public_metrics' });
    const tweetCount = await client.v2.tweetCountRecent('#STRON');
    const interactions = tweetCount.data.reduce((sum, day) => sum + day.tweet_count, 0); // Approximate
    const runtime = Math.floor((new Date() - startTime) / 1000); // Seconds

    // Save to MongoDB
    const metric = new Metric({
      followers: user.data.public_metrics.followers_count,
      tweets: user.data.public_metrics.tweet_count,
      interactions,
      runtime,
    });
    await metric.save();

    res.json({
      followers: metric.followers,
      tweets: metric.tweets,
      interactions: metric.interactions,
      runtime: metric.runtime,
    });
  } catch (err) {
    console.error('Metrics error:', err.message);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Run bot
require('./bot.js');

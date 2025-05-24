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
    }).then(() => {
      console.log('MongoDB connected');
    }).catch(err => {
      console.error('MongoDB connection error:', err.message);
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

    // Metrics endpoint disabled
    app.get('/metrics', (req, res) => res.json({ error: 'Metrics temporarily disabled due to rate limits' }));

    // Start server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Run bot
    require('./bot.js');

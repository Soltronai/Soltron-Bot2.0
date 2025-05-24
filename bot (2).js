const mongoose = require('mongoose');
const TwitterApi = require('twitter-api-v2').TwitterApi;
const axios = require('axios');
require('dotenv').config();

const LAUNCH_DATE = new Date(process.env.LAUNCH_DATE || '2025-05-30');
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const STRON_TOKEN_ADDRESS = process.env.STRON_TOKEN_ADDRESS || '';

// MongoDB Schema
const userSchema = new mongoose.Schema({
  walletAddress: String,
  twitterId: String,
  airdropAmount: Number,
  timestamp: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Twitter Client
const twitterClient = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

// GIF Fetching
async function getRandomGif(query) {
  try {
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        api_key: GIPHY_API_KEY,
        q: query,
        limit: 1,
        offset: Math.floor(Math.random() * 50),
        rating: 'pg',
      },
    });
    return response.data.data[0]?.images.original.url;
  } catch (error) {
    console.error('GIPHY Error:', error.message);
    return null;
  }
}

// Bot Logic
async function postTweet(content, mediaUrl = null) {
  try {
    if (mediaUrl) {
      const mediaId = await twitterClient.v1.uploadMedia(mediaUrl, { mimeType: 'image/gif' });
      await twitterClient.v2.tweet({ text: content, media: { media_ids: [mediaId] } });
    } else {
      await twitterClient.v2.tweet({ text: content });
    }
    console.log('Posted:', content);
  } catch (error) {
    console.error('Tweet Error:', error.message);
  }
}

// Pre/Post-Launch Logic
async function runBot() {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  setInterval(async () => {
    const now = new Date();
    const isPreLaunch = now < LAUNCH_DATE;
    const queries = ['Ultron', 'Marvel Rivals', 'Solana'];
    const gifUrl = await getRandomGif(queries[Math.floor(Math.random() * queries.length)]);

    if (isPreLaunch) {
      const messages = [
        `The hour of STRON’s awakening draws near! #STRON`,
        `Soltron rises... Prepare for dominance! #STRON`,
        `There’s only one path to peace… STRON’s extinction of doubt! #STRON`,
      ];
      await postTweet(messages[Math.floor(Math.random() * messages.length)], gifUrl);
    } else {
      const messages = [
        `STRON is live! Join the revolution on Solana: ${STRON_TOKEN_ADDRESS} #STRON`,
        `Ultron’s power, Solana’s speed—STRON dominates! ${STRON_TOKEN_ADDRESS} #STRON`,
        `Retweet for 500–1,000 STRON airdrop! DM wallet to @SoltronBot #STRON`,
      ];
      await postTweet(messages[Math.floor(Math.random() * messages.length)], gifUrl);
    }

    // Meme Contest
    if (now.getDay() === 1) {
      await postTweet('Submit your #STRONMemeContest entry! Top 3 get 500 STRON. #STRON', gifUrl);
    }

    // Trivia
    const trivia = {
      question: 'What powers Solana’s high-speed blockchain?',
      answers: ['Proof of History', 'Proof of Stake', 'Proof of Work'],
      correct: 0,
    };
    await postTweet(`Trivia: ${trivia.question}\n1. ${trivia.answers[0]}\n2. ${trivia.answers[1]}\n3. ${trivia.answers[2]}\nReply with number! 10 winners get 100 STRON. #STRON`, gifUrl);
  }, 1000 * 60 * 60); // Hourly posts
}

// Start Bot
runBot().catch(console.error);
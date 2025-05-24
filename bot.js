console.log('bot.js started');
require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const axios = require('axios');

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

const messages = [
  'The hour of STRON’s awakening draws near! #STRON #Solana',
  'Power up with Soltron Coin! The future is bright. #STRON #Ultron',
  'Soltron is coming to dominate the memecoin universe! #STRON #MarvelRivals',
  'Get ready for the STRON launch on May 30, 2025! #Solana #STRON',
];

async function getGiphyUrl() {
  try {
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        q: 'ultron marvel rivals solana',
        limit: 1,
        offset: Math.floor(Math.random() * 50),
      },
    });
    return response.data.data[0]?.images.original.url || '';
  } catch (err) {
    console.error('GIPHY API error:', err.message);
    return '';
  }
}

async function postTweet() {
  try {
    const message = messages[Math.floor(Math.random() * messages.length)];
    const gifUrl = await getGiphyUrl();
    const tweet = gifUrl ? `${message}\n${gifUrl}` : message;
    await client.v2.tweet(tweet);
    console.log('Posted tweet:', tweet);
  } catch (err) {
    console.error('Tweet error:', err.message, err.errors || '');
  }
}

// Post every hour
setInterval(postTweet, 60 * 60 * 1000);

// Initial post on startup
postTweet();

require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

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
  'Get ready for the STRON launch COMING SOON! #Solana #STRON',
  'You are all unbearably naive" #Solana #Meme
];

async function postTweet() {
  try {
    const message = messages[Math.floor(Math.random() * messages.length)];
    await client.v2.tweet(message);
    console.log('Posted tweet:', message);
  } catch (err) {
    console.error('Tweet error:', err.message, err.errors || '');
  }
}

// Post every hour
setInterval(postTweet, 60 * 60 * 1000);

// Initial post on startup
postTweet();

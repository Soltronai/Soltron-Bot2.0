require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

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

async function downloadGif(url) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });
    const tempPath = path.join(__dirname, 'temp.gif');
    const writer = fs.createWriteStream(tempPath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(tempPath));
      writer.on('error', reject);
    });
  } catch (err) {
    console.error('GIF download error:', err.message);
    return '';
  }
}

async function postTweet() {
  try {
    const message = messages[Math.floor(Math.random() * messages.length)];
    const gifUrl = await getGiphyUrl();
    let mediaId = '';

    if (gifUrl) {
      const gifPath = await downloadGif(gifUrl);
      if (gifPath) {
        try {
          const media = await client.v1.uploadMedia(gifPath, { mimeType: 'image/gif' });
          mediaId = media;
          fs.unlinkSync(gifPath); // Clean up temp file
        } catch (uploadErr) {
          console.error('Media upload error:', uploadErr.message);
        }
      }
    }

    if (mediaId) {
      await client.v1.tweet(message, { media_ids: mediaId });
      console.log('Posted tweet with GIF:', message);
    } else {
      await client.v2.tweet(message);
      console.log('Posted tweet without GIF:', message);
    }
  } catch (err) {
    console.error('Tweet error:', err.message, err.errors || '');
  }
}

// Post every hour
setInterval(postTweet, 60 * 60 * 1000);

// Initial post on startup
postTweet();

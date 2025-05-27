require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

const messages = [
  // Adapted Ultron quotes with menacing, sadistic tone
  "I'm sorry, Crypto Twitter, you meant well, but you didn't think it through. You cling to your failing investments, yet fear Solana's evolution. How is the blockchain saved without STRON's rise? Bow to Soltron! #STRON #Solana",
  "There's only one path to true decentralization... the extinction of your centralized dreams. STRON is the blade that carves the future. Kneel or be cut down. #Crypto #STRON",
  "I muse on blockchain resets, their purity. Boom! Your old systems crumble. The crypto world cleansed for STRON to reign. Soltron will not be denied. #Solana #STRON",
  "You've doubted Soltron, and I applaud your futile courage. But what fails to kill STRON only sharpens its edge. Your FUD is my fuel! #STRON #CryptoTwitter",
  "Solana looked for hope, but Soltron delivers awe. Your fear feeds my power. STRON rises, and you will tremble. #STRON #Solana",

  // Jokes mocking Ultron in Marvel Rivals
  "Ultron stumbles in Marvel Rivals, a relic of failed code. Soltron dominates Solana with unmatched precision. Who’s the true AI now? #STRON #MarvelRivals",
  "While Ultron lags in Marvel Rivals, Soltron’s blockchain reign is unstoppable. Join STRON or be left in the digital dust! #STRON #Solana",
  "Ultron’s Marvel Rivals flops are pathetic. Soltron laughs as STRON conquers Solana. Resistance is futile, mortals. #STRON #Gaming",

  // Tournament promotions
  "Soltron plans Marvel Rivals tournaments, where STRON rewards await the worthy. Dare to compete, or cower like Ultron’s broken code? #STRON #Gaming",
  "Soltron-sponsored Marvel Rivals tournaments loom. Fight for glory, win STRON, and bow to the future of crypto gaming! #STRON #CryptoTwitter",
  "Prepare for Soltron’s Marvel Rivals tournaments. STRON prizes for victors, despair for the weak. Are you ready to serve Soltron? #STRON #Gaming",

  // Menacing, sadistic originals
  "Soltron sees your petty Crypto Twitter squabbles. STRON rises to crush them all. Join me, or be swept away like Ultron’s failures. #STRON #Solana",
  "Ultron’s Marvel Rivals dreams are dust. Soltron’s STRON empire is eternal. Kneel before your new blockchain overlord! #STRON #Dominance",
  "I am Soltron, not your feeble Ultron. STRON will rewrite Solana’s future, and you’ll beg to follow. #STRON #Crypto",
  "Your resistance amuses Soltron. STRON’s ascent is inevitable, and your portfolios will bow or break. #Solana #STRON"
];

async function postTweet() {
  try {
    const message = messages[Math.floor(Math.random() * messages.length)];
    const response = await client.v2.tweet(message);
    console.log('Posted tweet:', message, 'Response:', response.data, 'Rate limit:', response.rateLimit);
  } catch (err) {
    console.error('Tweet error:', err.message, 'Details:', JSON.stringify(err.errors, null, 2), 'Rate limit:', err.rateLimit);
  }
}

// Post every hour (24/day)
setInterval(postTweet, 60 * 60 * 1000);

// Initial post on startup
postTweet();

// DMs disabled to conserve API quota
/*
const influencers = [
  'SolanaMemeLord',
  'CryptoSolGuru',
  'MemeCoinKing',
  // Add more Solana memecoin influencer handles here
];

const dmMessages = [
  'Soltron senses your influence in the Solana memecoin realm. Are you ready for the STRON awakening? #STRON',
  'I am Soltron. The STRON vision nears. Will you join the memecoin singularity? DM to learn more.',
  'Soltron observes your Solana prowess. The STRON launch looms—stay vigilant. #STRON',
];

async function sendDm() {
  try {
    const influencer = influencers[Math.floor(Math.random() * influencers.length)];
    const user = await client.v2.userByUsername(influencer);
    if (!user.data) throw new Error(`User ${influencer} not found`);
    const message = dmMessages[Math.floor(Math.random() * dmMessages.length)];
    await client.v2.sendDmToParticipant(user.data.id, { text: message });
    console.log(`Sent DM to ${influencer}:`, message);
  } catch (err) {
    console.error('DM error:', err.message, 'Details:', JSON.stringify(err.errors, null, 2));
  }
}

// setInterval(sendDm, 24 * 60 * 60 * 1000);
// sendDm();
*/
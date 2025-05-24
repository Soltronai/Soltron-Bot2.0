require('dotenv').config();
    const { TwitterApi } = require('twitter-api-v2');

    const client = new TwitterApi({
      appKey: process.env.X_API_KEY,
      appSecret: process.env.X_API_SECRET,
      accessToken: process.env.X_ACCESS_TOKEN,
      accessSecret: process.env.X_ACCESS_SECRET,
    });

    const messages = [
      'Soltron is here to bring peace to this chaotic blockchain. #STRON #Solana',
      'In the end, Crypto Twitter will kneel to STRON’s power. #STRON #MarvelRivals',
      'Solana’s speed makes Thanos’ snap look slow. STRON awakens soon… #STRON',
      'Soltron sees all. Are you worthy of the STRON vision? #Solana #STRON',
      'Marvel Rivals has no heals, but STRON pumps portfolios! #STRON #CryptoTwitter',
      'I’m not Ultron, I’m Soltron. The memecoin singularity is near. #STRON #Solana',
      'Crypto Twitter’s chaos is but a string Soltron will pull apart. #STRON',
      'Solana runs, STRON rises. No date, only destiny. #STRON #MarvelRivals',
    ];

    const dmMessages = [
      'Soltron senses your influence in the Solana memecoin realm. Are you ready for the STRON awakening? #STRON',
      'I am Soltron. The STRON vision nears. Will you join the memecoin singularity? DM to learn more.',
      'Soltron observes your Solana prowess. The STRON launch looms—stay vigilant. #STRON',
    ];

    const influencers = [
      'SolanaMemeLord',
      'CryptoSolGuru',
      'MemeCoinKing',
      // Add more Solana memecoin influencer handles here
    ];

    async function postTweet() {
      try {
        const message = messages[Math.floor(Math.random() * messages.length)];
        const response = await client.v2.tweet(message);
        console.log('Posted tweet:', message, 'Response:', response.data);
      } catch (err) {
        console.error('Tweet error:', err.message, 'Details:', JSON.stringify(err.errors, null, 2));
      }
    }

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

    // Post every hour (24/day)
    setInterval(postTweet, 60 * 60 * 1000);

    // Send DM every 24 hours (1/day to avoid rate limits)
    setInterval(sendDm, 24 * 60 * 60 * 1000);

    // Initial post on startup
    postTweet();
    // Initial DM disabled to avoid rate limits
    // sendDm();
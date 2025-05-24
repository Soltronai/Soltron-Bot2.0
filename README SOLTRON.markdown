# Soltron Bot

Bot and dashboard for Soltron Coin (STRON), a Solana-based memecoin. The bot posts on X with Ultron-themed messages, Marvel Rivals jokes, and Solana insights, building hype pre-launch (May 24–29, 2025) and engaging users post-launch (May 30, 2025).

## Setup
1. **Prerequisites**:
   - Node.js 18.x
   - Heroku account
   - MongoDB Atlas account
   - X Developer Portal API keys
   - GIPHY API key

2. **Installation**:
   - Clone the repository: `git clone https://github.com/yourusername/soltron-bot.git`
   - Install dependencies: `npm install`
   - Create `.env` file based on `.env.example` and fill in your keys.

3. **Deployment**:
   - Create a Heroku app (`soltron-bot`).
   - Connect to this GitHub repository in Heroku’s “Deploy” tab.
   - Set Config Vars in Heroku: `MONGODB_URI`, `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_SECRET`, `GIPHY_API_KEY`, `PORT`, `LAUNCH_DATE`, `STRON_TOKEN_ADDRESS`.
   - Deploy the `main` branch.
   - Verify at `soltron-bot.herokuapp.com` and @SoltronBot on X.

4. **Usage**:
   - Pre-launch: Bot posts suspenseful messages (e.g., “STRON’s awakening draws near!”).
   - Post-launch: Shares STRON token info, airdrops, and contests.
   - Check dashboard for metrics (users, airdrops, posts).

## Troubleshooting
- **Bot not posting**: Check X API keys and Heroku logs (`heroku logs --tail`).
- **Dashboard blank**: Verify `MONGODB_URI` in Config Vars.
- **GIFs missing**: Ensure `GIPHY_API_KEY` is valid, GIFs <5 MB.

## License
MIT License
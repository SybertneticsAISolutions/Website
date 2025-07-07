# Firebase Configuration Setup

## Required Environment Variables

You need to set these environment variables in Firebase Cloud Functions using the Firebase CLI:

### SMTP Configuration (for email sending)
```bash
firebase functions:config:set smtp.host="smtp.gmail.com" \
  smtp.port="587" \
  smtp.user="noreply@sybertnetics.com" \
  smtp.pass="sraq bhco pspz cgqe" \
  smtp.recipient_email="support@sybertnetics.com"
```

### Discord Bot Configuration
```bash
firebase functions:config:set discord.guild_id="YOUR_DISCORD_SERVER_ID" \
  discord.bot_token="YOUR_DISCORD_BOT_TOKEN"
```

## How to Get Discord Configuration

1. **Discord Server ID (Guild ID):**
   - Go to your Discord server
   - Right-click on the server name
   - Select "Copy Server ID" (you need Developer Mode enabled)

2. **Discord Bot Token:**
   - Go to https://discord.com/developers/applications
   - Create a new application or select existing one
   - Go to the "Bot" section
   - Create a bot and copy the token
   - **Important:** Add the bot to your server with appropriate permissions

## Deploy Configuration

After setting the environment variables, deploy the functions:
```bash
cd functions
firebase deploy --only functions
```

## Verify Configuration

You can check your current configuration with:
```bash
firebase functions:config:get
```

## Next.js Environment Variables

Make sure to also set these in your Next.js `.env` file:
```
DISCORD_GUILD_ID=your_discord_server_id_here
DISCORD_BOT_TOKEN=your_discord_bot_token_here
```
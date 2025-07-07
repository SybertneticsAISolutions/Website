# Discord Bot Invite URL Generator

## Your Bot Application ID
Based on your bot token, you'll need to find your Application ID from the Discord Developer Portal.

## Step-by-Step Instructions:

1. **Go to Discord Developer Portal**:
   - Visit: https://discord.com/developers/applications
   - Click on your bot application

2. **Get Application ID**:
   - In the "General Information" section
   - Copy the "Application ID"

3. **Generate Invite URL**:
   - Go to "OAuth2" → "URL Generator"
   - **Scopes**: Check these boxes:
     - ✅ `bot`
     - ✅ `applications.commands` (if you want slash commands)
   
   - **Bot Permissions**: Select these minimum permissions:
     - ✅ `View Channels`
     - ✅ `Read Message History`
     - ✅ `Send Messages` (optional)
     - ✅ `Connect` (if using voice features)
     - ✅ `Use Slash Commands` (if applicable)

4. **Copy Generated URL**:
   - Copy the generated URL at the bottom
   - Open it in your browser
   - Select your Discord server
   - Click "Authorize"

## Alternative Manual URL:
If you have your Application ID, you can use this URL format:
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_APPLICATION_ID&permissions=68608&scope=bot
```

Replace `YOUR_APPLICATION_ID` with your actual Application ID.

## Verification Steps:
After re-inviting:
1. Check your Discord server's member list (right sidebar)
2. Look for your bot with a "BOT" tag
3. Check Server Settings → Roles for bot role
4. Try mentioning the bot with @BotName

## If Bot Still Doesn't Appear:
1. Refresh Discord (Ctrl+R)
2. Restart Discord completely
3. Check on Discord mobile app
4. Verify bot token isn't expired in Developer Portal 
const admin = require('firebase-admin');
const { initializeFirebaseAdmin } = require('./utils/auth');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    console.log('Discord API route accessed');
    
    // Initialize Firebase Admin if not already initialized
    await initializeFirebaseAdmin();

    // Discord API endpoint to get guild (server) information
    const guildId = process.env.DISCORD_GUILD_ID || "1386616507668365312";
    const botToken = process.env.DISCORD_BOT_TOKEN || "MTM5MTE1ODAxOTIxNTE5NjI2MA.GjwfyE.MvEATevfmz9KSmUxBTvGLGbbjUR3ao3mS-RP2k";

    console.log('Discord API Debug:', {
      guildId: guildId ? 'SET' : 'NOT SET',
      botToken: botToken ? 'SET' : 'NOT SET',
      guildIdValue: guildId,
      // Don't log the full token for security
      botTokenPrefix: botToken ? botToken.substring(0, 10) + '...' : 'N/A'
    });

    if (!guildId || !botToken) {
      console.error('Discord configuration missing:', { guildId: !!guildId, botToken: !!botToken });
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Discord configuration missing' }),
      };
    }

    const discordUrl = `https://discord.com/api/v10/guilds/${guildId}?with_counts=true`;
    console.log('Making Discord API request to:', discordUrl);

    const response = await fetch(discordUrl, {
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Discord API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord API error:', response.status, errorText);
      
      // Return fallback value if Discord API fails
      console.log('Using fallback Discord member count value');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          memberCount: 9,
          totalMembers: 9,
          onlineMembers: 5,
        }),
      };
    }

    const guildData = await response.json();
    console.log('Discord API success:', {
      memberCount: guildData.approximate_member_count,
      totalMembers: guildData.member_count,
      onlineMembers: guildData.approximate_presence_count
    });

    // Return both total members and approximate member count
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        memberCount: guildData.approximate_member_count || 9,
        totalMembers: guildData.member_count || 9,
        // Subtract 2 from onlineMembers to account for bots, but do not go below zero
        onlineMembers: Math.max((guildData.approximate_presence_count || 5) - 2, 0), // Adjusted for bot accounts
      }),
    };
  } catch (error) {
    console.error('Error fetching Discord member count:', error);
    
    // Return fallback value on error
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        memberCount: 9,
        totalMembers: 9,
        // Also apply the adjustment to the fallback value
        onlineMembers: Math.max(5 - 2, 0), // Adjusted for bot accounts
      }),
    };
  }
}; 
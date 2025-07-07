import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Discord API endpoint to get guild (server) information
    const guildId = process.env.DISCORD_GUILD_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    console.log('Discord API Debug:', {
      guildId: guildId ? 'SET' : 'NOT SET',
      botToken: botToken ? 'SET' : 'NOT SET',
      guildIdValue: guildId,
      // Don't log the full token for security
      botTokenPrefix: botToken ? botToken.substring(0, 10) + '...' : 'N/A'
    });

    if (!guildId || !botToken) {
      console.error('Discord configuration missing:', { guildId: !!guildId, botToken: !!botToken });
      return NextResponse.json(
        { error: 'Discord configuration missing' },
        { status: 500 }
      );
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
      throw new Error(`Discord API error: ${response.status} - ${errorText}`);
    }

    const guildData = await response.json();
    console.log('Discord API success:', {
      memberCount: guildData.approximate_member_count,
      totalMembers: guildData.member_count,
      onlineMembers: guildData.approximate_presence_count
    });

    // Return both total members and approximate member count
    return NextResponse.json({
      memberCount: guildData.approximate_member_count || 0,
      totalMembers: guildData.member_count || 0,
      onlineMembers: guildData.approximate_presence_count || 0,
    });
  } catch (error) {
    console.error('Error fetching Discord member count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Discord member count' },
      { status: 500 }
    );
  }
}
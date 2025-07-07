import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Discord API endpoint to get guild (server) information
    const guildId = process.env.DISCORD_GUILD_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!guildId || !botToken) {
      return NextResponse.json(
        { error: 'Discord configuration missing' },
        { status: 500 }
      );
    }

    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`);
    }

    const guildData = await response.json();

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
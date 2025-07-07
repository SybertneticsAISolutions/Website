import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID || "1386616507668365312",
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN || "MTM5MTE1ODAxOTIxNTE5NjI2MA.GjwfyE.MvEATevfmz9KSmUxBTvGLGbbjUR3ao3mS-RP2k",
  }
};

export default nextConfig;

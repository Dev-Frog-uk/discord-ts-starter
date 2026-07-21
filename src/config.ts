import "dotenv/config";

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getBotConfig() {
  return {
    token: requiredEnv("DISCORD_TOKEN"),
  };
}

export function getDeployConfig() {
  return {
    token: requiredEnv("DISCORD_TOKEN"),
    clientId: requiredEnv("DISCORD_CLIENT_ID"),
    guildId: process.env.DISCORD_GUILD_ID?.trim() || undefined,
  };
}

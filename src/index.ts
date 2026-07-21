import { BotClient } from "./client/bot-client.js";
import { getBotConfig } from "./config.js";

async function main(): Promise<void> {
  const { token } = getBotConfig();
  const client = new BotClient();

  const shutDown = () => {
    console.log("Shutting down…");
    client.destroy();
  };

  process.once("SIGINT", shutDown);
  process.once("SIGTERM", shutDown);

  await client.start(token);
}

main().catch((error: unknown) => {
  console.error("Bot failed to start:", error);
  process.exitCode = 1;
});

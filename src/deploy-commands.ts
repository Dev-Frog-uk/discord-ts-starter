import { REST, Routes } from "discord.js";

import { getDeployConfig } from "./config.js";
import { loadCommands } from "./loaders/load-commands.js";

async function deployCommands(): Promise<void> {
  const { token, clientId, guildId } = getDeployConfig();
  const commands = await loadCommands();
  const body = commands.map((command) => command.data.toJSON());
  const rest = new REST().setToken(token);
  const route = guildId
    ? Routes.applicationGuildCommands(clientId, guildId)
    : Routes.applicationCommands(clientId);

  console.log(
    `Registering ${body.length} ${guildId ? "guild" : "global"} command(s)…`,
  );
  await rest.put(route, { body });
  console.log("Commands registered successfully.");
}

deployCommands().catch((error: unknown) => {
  console.error("Failed to register commands:", error);
  process.exitCode = 1;
});

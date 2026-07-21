import { Collection } from "discord.js";

import type { Command } from "../types/command.js";
import { loadDefaultExports } from "./load-modules.js";

const commandsDirectory = new URL("../commands/", import.meta.url);

export async function loadCommands(): Promise<Collection<string, Command>> {
  const commands = new Collection<string, Command>();

  for (const command of await loadDefaultExports<Command>(commandsDirectory)) {
    const name = command.data.name;

    if (commands.has(name)) {
      throw new Error(`Duplicate command name: ${name}`);
    }

    commands.set(name, command);
  }

  return commands;
}

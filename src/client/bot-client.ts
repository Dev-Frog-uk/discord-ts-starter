import { Client, Collection, GatewayIntentBits } from "discord.js";

import { loadCommands } from "../loaders/load-commands.js";
import { loadEvents } from "../loaders/load-events.js";
import type { Command } from "../types/command.js";

export class BotClient extends Client {
  readonly commands = new Collection<string, Command>();

  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds],
    });
  }

  async start(token: string): Promise<void> {
    const commands = await loadCommands();
    this.commands.clear();
    commands.forEach((command, name) => {
      this.commands.set(name, command);
    });

    await loadEvents(this);
    await this.login(token);
  }
}

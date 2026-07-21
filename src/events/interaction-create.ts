import { Events, MessageFlags } from "discord.js";
import type { InteractionReplyOptions } from "discord.js";

import type { BotClient } from "../client/bot-client.js";
import { defineEvent } from "../types/event.js";

const interactionCreateEvent = defineEvent({
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const client = interaction.client as BotClient;
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.warn(`No command handler found for /${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Failed to execute /${interaction.commandName}:`, error);

      const response = {
        content: "Something went wrong while running that command.",
        flags: MessageFlags.Ephemeral,
      } satisfies InteractionReplyOptions;

      if (interaction.deferred || interaction.replied) {
        await interaction.followUp(response);
      } else {
        await interaction.reply(response);
      }
    }
  },
});

export default interactionCreateEvent;

import { MessageFlags, SlashCommandBuilder } from "discord.js";

import type { Command } from "../types/command.js";

const pingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check whether the bot is online"),

  async execute(interaction) {
    const reply = await interaction.reply({
      content: "Pinging…",
      flags: MessageFlags.Ephemeral,
      withResponse: true,
    });

    const roundTrip = reply.resource?.message
      ? reply.resource.message.createdTimestamp - interaction.createdTimestamp
      : 0;

    await interaction.editReply(
      `Pong! WebSocket: ${interaction.client.ws.ping}ms · Round trip: ${roundTrip}ms`,
    );
  },
};

export default pingCommand;

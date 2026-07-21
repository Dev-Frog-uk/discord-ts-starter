import { Events } from "discord.js";

import { defineEvent } from "../types/event.js";

const clientReadyEvent = defineEvent({
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready as ${client.user.tag}`);
  },
});

export default clientReadyEvent;

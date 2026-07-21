import type { Client } from "discord.js";

import type { AnyBotEvent } from "../types/event.js";
import { loadDefaultExports } from "./load-modules.js";

const eventsDirectory = new URL("../events/", import.meta.url);

export async function loadEvents(client: Client): Promise<void> {
  const events = await loadDefaultExports<AnyBotEvent>(eventsDirectory);

  for (const event of events) {
    // The event name and listener tuple were checked together by defineEvent.
    const execute = event.execute as (...args: any[]) => void | Promise<void>;
    const listener = (...args: any[]) => {
      Promise.resolve(execute(...args)).catch((error: unknown) => {
        console.error(`Unhandled error in ${event.name} event:`, error);
      });
    };

    if (event.once) {
      client.once(event.name, listener);
    } else {
      client.on(event.name, listener);
    }
  }
}

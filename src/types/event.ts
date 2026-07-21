import type { ClientEvents } from "discord.js";

export interface BotEvent<K extends keyof ClientEvents> {
  name: K;
  once?: boolean;
  execute: (...args: ClientEvents[K]) => void | Promise<void>;
}

export type AnyBotEvent = {
  [K in keyof ClientEvents]: BotEvent<K>;
}[keyof ClientEvents];

export function defineEvent<K extends keyof ClientEvents>(
  event: BotEvent<K>,
): BotEvent<K> {
  return event;
}

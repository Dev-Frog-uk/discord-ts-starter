# Discord Bot Scaffold

A small foundation for Discord bots using `discord.js`. It includes automatic command and event loading, slash-command registration, environment validation, and a `/ping` example.

## Requirements

- Node.js 20 or newer
- pnpm
- A Discord application and bot from the [Discord Developer Portal](https://discord.com/developers/applications)

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy `.env.example` to `.env` and enter your bot token and application ID.

3. Invite the bot to your development server. In the Developer Portal's **OAuth2 > URL Generator**, select the `bot` and `applications.commands` scopes.

4. Register the slash commands:

   ```bash
   pnpm deploy:commands
   ```

   Set `DISCORD_GUILD_ID` while developing so command changes appear in that server immediately. Remove it when you are ready to register commands globally.

5. Start the bot:

   ```bash
   pnpm dev
   ```

Run the production build with:

```bash
pnpm build
pnpm start
```

## Project layout

```text
src/
├── client/             # Extended Discord client
├── commands/           # One default-exported module per slash command
├── events/             # One default-exported module per Discord event
├── loaders/            # Automatic command/event discovery
├── types/              # Shared TypeScript contracts
├── config.ts           # Environment configuration
├── deploy-commands.ts  # Discord slash-command registration
└── index.ts            # Bot entry point
```

## Add a command

Create a file in `src/commands`. Every command must default-export a `Command`:

```ts
import { SlashCommandBuilder } from "discord.js";

import type { Command } from "../types/command.js";

const helloCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Say hello"),

  async execute(interaction) {
    await interaction.reply("Hello!");
  },
};

export default helloCommand;
```

Run `pnpm deploy:commands` again whenever a command's name, description, or options change. Handler-only changes just require restarting the bot.

## Add an event

Create a file in `src/events` and default-export a `BotEvent`:

```ts
import { Events } from "discord.js";

import { defineEvent } from "../types/event.js";

const guildCreateEvent = defineEvent({
  name: Events.GuildCreate,
  execute(guild) {
    console.log(`Joined ${guild.name}`);
  },
});

export default guildCreateEvent;
```

Only the `Guilds` gateway intent is enabled by default. Add other intents in `src/client/bot-client.ts` when features need them, and enable privileged intents in the Developer Portal when applicable.

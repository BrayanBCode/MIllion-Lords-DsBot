import { BitFieldResolvable, Client, Collection, GatewayIntentsString } from "discord.js";
import { config } from 'dotenv';
import { Command } from "../commands/Command";
import { loadEvents } from "../handlers/EventLoader";
import { loadCommands, registerCommands } from "../handlers/CommandLoader";

config();

interface BClientOptions {
    intents: BitFieldResolvable<GatewayIntentsString, number>[];
}

export class BotClient extends Client {

    public commands = new Collection<string, Command>();

    constructor({ intents }: BClientOptions) {
        super({ intents });

    }

    async init() {
        await loadEvents(this);
        await loadCommands(this);

        // Register commands after loading them
        await registerCommands(this);

        // o por guild:
        // await registerGuildCommands(this, process.env.GUILD_ID!);

        this.login(`${process.env.TOKEN}`);

    }

}
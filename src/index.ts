import { BotClient } from "./core/BotClient";
import { GatewayIntentBits } from "discord.js";


const client = new BotClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.init()
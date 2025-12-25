"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BotClient_1 = require("./core/BotClient");
const discord_js_1 = require("discord.js");
const client = new BotClient_1.BotClient({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent
    ]
});
client.init();

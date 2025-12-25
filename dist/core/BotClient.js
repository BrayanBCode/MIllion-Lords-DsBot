"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotClient = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const EventLoader_1 = require("../handlers/EventLoader");
const CommandLoader_1 = require("../handlers/CommandLoader");
(0, dotenv_1.config)();
class BotClient extends discord_js_1.Client {
    constructor({ intents }) {
        super({ intents });
        this.commands = new discord_js_1.Collection();
    }
    async init() {
        await (0, EventLoader_1.loadEvents)(this);
        await (0, CommandLoader_1.loadCommands)(this);
        // Register commands after loading them
        await (0, CommandLoader_1.registerCommands)(this);
        // o por guild:
        // await registerGuildCommands(this, process.env.GUILD_ID!);
        this.login(`${process.env.TOKEN}`);
    }
}
exports.BotClient = BotClient;

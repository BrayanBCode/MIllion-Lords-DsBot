import { Client } from "discord.js";
import { Event } from "../Event";
import { BotClient } from "../../core/BotClient";
import logger from "../../core/logger";

export default class OnReady extends Event<"clientReady"> {
    constructor() {
        super("clientReady", true);
    }
    execute(Client: BotClient, client: Client<true>): Promise<void> | void {
        logger.info(`🤖 Conectado como ${client.user.tag} (ID: ${client.user.id})`);
    }

}
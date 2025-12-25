import { readdirSync } from "node:fs";
import { join } from "node:path";
import { BotClient } from "../core/BotClient";
import logger from "../core/logger";
import { Event } from "../events/Event";

export async function loadEvents(client: BotClient) {
    const eventsPath = join(__dirname, "..", "events", "discord");

    logger.info(`🔄 Cargando eventos desde: ${eventsPath}`);

    const files = readdirSync(eventsPath);
    for (const file of files) {
        if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

        const imported = require(join(eventsPath, file));
        const EventClass = imported.default;

        const event = new EventClass() as Event<any>;

        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }

        logger.info(`Evento cargado: ${event.name}`);
    }
}

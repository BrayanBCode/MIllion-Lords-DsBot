"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEvents = loadEvents;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const logger_1 = __importDefault(require("../core/logger"));
async function loadEvents(client) {
    const eventsPath = (0, node_path_1.join)(__dirname, "..", "events", "discord");
    logger_1.default.info(`🔄 Cargando eventos desde: ${eventsPath}`);
    const files = (0, node_fs_1.readdirSync)(eventsPath);
    for (const file of files) {
        if (!file.endsWith(".ts") && !file.endsWith(".js"))
            continue;
        const imported = require((0, node_path_1.join)(eventsPath, file));
        const EventClass = imported.default;
        const event = new EventClass();
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        }
        else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }
        logger_1.default.info(`Evento cargado: ${event.name}`);
    }
}

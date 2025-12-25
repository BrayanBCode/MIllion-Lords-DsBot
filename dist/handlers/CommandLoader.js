"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCommands = loadCommands;
exports.registerCommands = registerCommands;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const discord_js_1 = require("discord.js");
const logger_1 = __importDefault(require("../core/logger"));
async function loadCommands(client) {
    const commandsPath = (0, node_path_1.join)(__dirname, "..", "commands", "Mlords");
    logger_1.default.info(`🔄 Cargando comandos desde: ${commandsPath}`);
    const files = (0, node_fs_1.readdirSync)(commandsPath);
    for (const file of files) {
        if (!file.endsWith(".ts") && !file.endsWith(".js"))
            continue;
        const filePath = (0, node_path_1.join)(commandsPath, file);
        const imported = await Promise.resolve(`${filePath}`).then(s => __importStar(require(s)));
        const command = imported.default;
        if (!command)
            continue;
        client.commands.set(command.name, command);
        logger_1.default.info(`Comando cargado: ${command.name}`);
    }
}
async function registerCommands(client) {
    try {
        if (client.commands.size === 0) {
            logger_1.default.info("No hay comandos para registrar.");
            return;
        }
        const commandsJson = client.commands.map(cmd => cmd.toJSON());
        const rest = new discord_js_1.REST({ version: "10" }).setToken(process.env.TOKEN);
        logger_1.default.info(`🔁 Registrando ${commandsJson.length} comandos (globales)...`);
        await rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), { body: commandsJson });
        logger_1.default.info("✅ Comandos registrados globalmente.");
    }
    catch (error) {
        console.error("❌ Error registrando comandos:", error);
    }
}

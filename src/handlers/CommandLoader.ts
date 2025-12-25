import { readdirSync } from "node:fs";
import { join } from "node:path";
import { BotClient } from "../core/BotClient";
import { Command } from "../commands/Command";
import { REST, Routes } from "discord.js";
import logger from "../core/logger";


export async function loadCommands(client: BotClient) {
    const commandsPath = join(__dirname, "..", "commands", "Mlords");

    logger.info(`🔄 Cargando comandos desde: ${commandsPath}`);

    const files = readdirSync(commandsPath);

    for (const file of files) {
        if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

        const filePath = join(commandsPath, file);
        const imported = await import(filePath);

        const command: Command = imported.default;
        if (!command) continue;



        client.commands.set(command.name, command);
        logger.info(`Comando cargado: ${command.name}`);
    }
}


export async function registerCommands(client: BotClient) {
    try {
        if (client.commands.size === 0) {
            logger.info("No hay comandos para registrar.");
            return;
        }

        const commandsJson = client.commands.map(cmd => cmd.toJSON());

        const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

        logger.info(`🔁 Registrando ${commandsJson.length} comandos (globales)...`);

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID!),
            { body: commandsJson }
        );

        logger.info("✅ Comandos registrados globalmente.");
    } catch (error) {
        console.error("❌ Error registrando comandos:", error);
    }
}

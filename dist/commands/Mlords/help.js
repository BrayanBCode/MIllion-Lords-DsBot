"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../Command");
exports.default = new Command_1.Command()
    .setName("help")
    .setDescription("📚 Muestra una lista de todos los comandos disponibles.")
    .setExecute(async (client, interaction) => {
    const commands = [...client.commands.values()];
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("📘 Lista de Comandos")
        .setDescription("Aquí tienes todos los comandos disponibles en el bot.")
        .setColor("#42A5FF")
        .setThumbnail("https://cdn-icons-png.flaticon.com/512/854/854878.png")
        .setTimestamp()
        .setFooter({ text: "Million Lords Bot — Sistema de Ayuda" });
    for (const cmd of commands) {
        embed.addFields({
            name: `🔹 /${cmd.name}`,
            value: cmd.description ? cmd.description : "Sin descripción.",
        });
    }
    await interaction.reply({
        embeds: [embed],
        flags: discord_js_1.MessageFlags.Ephemeral,
    });
});

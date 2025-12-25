"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const utils_1 = require("../../utils/utils");
const Command_1 = require("../Command");
exports.default = new Command_1.Command()
    .setName("breakcity")
    .setDescription("Calcula cuántas tropas necesitas para romper una ciudad (por nivel).")
    .setExecute(async (client, interaction) => {
    const level = interaction.options.getNumber("level", true);
    const bonus = interaction.options.getNumber("bonus", true);
    const entry = utils_1.WALL_DATA.find(w => w.level === level);
    if (!entry) {
        return interaction.reply({ content: `❌ No encontré datos para el nivel ${level}.`, ephemeral: true });
    }
    const wallValue = (0, utils_1.parseWallValue)(entry.wall); // número real
    const needed = (0, utils_1.calculateNeededTroopsFromWallValue)(wallValue, bonus);
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`🪖 Tropas necesarias - Nivel ${level}`)
        .addFields({ name: "lvl", value: `\`${level}\``, inline: true }, { name: "Wall", value: `\`${entry.wall}\``, inline: true }, { name: "Bonus", value: `\`${bonus}%\``, inline: true }, { name: "needed troops", value: `\`${(0, utils_1.formatUnit)(needed)}\``, inline: false })
        .setFooter({ text: "Million Lords — Calculadora de Tropas Necesarias" })
        .setTimestamp()
        .setColor("Green");
    await interaction.reply({
        embeds: [embed],
        flags: discord_js_1.MessageFlags.SuppressNotifications
    });
})
    .addNumberOption(opt => opt
    .setName("level")
    .setDescription("Nivel de la ciudad (ej: 33)")
    .setRequired(true))
    .addNumberOption(opt => opt
    .setName("bonus")
    .setDescription("Bonus de ataque (%) (ej: 200)")
    .setRequired(true));

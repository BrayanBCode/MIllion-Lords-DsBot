"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const utils_1 = require("../../utils/utils");
const Command_1 = require("../Command");
exports.default = new Command_1.Command()
    .setName("citywall")
    .setDescription("📘 Muestra el muro y estadísticas correspondientes al nivel de una ciudad.")
    .setExecute(async (client, interaction) => {
    const level = interaction.options.getNumber("level", true);
    const entry = utils_1.WALL_DATA.find(w => w.level === level);
    if (!entry) {
        return interaction.reply({
            content: `❌ No encontré datos para el nivel **${level}**.`,
            ephemeral: true,
        });
    }
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`🛡️ City Wall`)
        .setDescription(`- 🏰 Nivel de Ciudad: \`${entry.level}\`\n` +
        `- 🧱 Muro: \`${entry.wall}\`\n` +
        `- 🗿 VP: \`${entry.vp}\`\n` +
        `- 💸 Costo de mejora: \`${entry.upgradeCost}\`\n` +
        `- 💵 Costo total: \`${entry.totalCost}\``)
        .setColor("#3A7DFF")
        .setFooter({ text: "Million Lords — Calculadora de Muros" })
        .setTimestamp();
    await interaction.reply({
        embeds: [embed],
        flags: discord_js_1.MessageFlags.SuppressNotifications
    });
})
    .addNumberOption(opt => opt
    .setName("level")
    .setDescription("Nivel de la ciudad")
    .setRequired(true));

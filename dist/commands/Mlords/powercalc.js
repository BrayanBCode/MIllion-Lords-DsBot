"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// commands/power.ts
const discord_js_1 = require("discord.js");
const utils_1 = require("../../utils/utils");
const Command_1 = require("../Command");
exports.default = new Command_1.Command()
    .setName("powercalc")
    .setDescription("Calcula el poder total de tus tropas.")
    .setExecute(async (client, interaction) => {
    const troops = interaction.options.getNumber("troops", true);
    const unit = interaction.options.getString("unit", true).toUpperCase();
    const bonus = interaction.options.getNumber("bonus", true);
    const multiplier = utils_1.UNIT_MAP[unit];
    const realTroops = troops * multiplier;
    const power = (0, utils_1.calculatePower)(realTroops, bonus);
    const availableCities = utils_1.WALL_DATA.filter(c => (0, utils_1.parseWallValue)(c.wall) <= power);
    const bestCity = availableCities.length > 0 ? availableCities[availableCities.length - 1] : null;
    let neededTroops = null;
    if (bestCity) {
        const wallValue = (0, utils_1.parseWallValue)(bestCity.wall);
        neededTroops = wallValue / (1 + bonus / 100);
    }
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("⚔️ Poder de Ataque")
        .addFields({ name: "🪖 tropas", value: `\`${troops}${unit}\``, inline: true }, { name: "📈 Bonus", value: `\`${bonus}%\``, inline: true }, { name: "⚔️ Poder Total", value: `\`${(0, utils_1.formatUnit)(power)}\``, inline: true }, { name: "🏰 Ciudad", value: bestCity ? `\`${bestCity.level}\`` : "`No city`", inline: true }, { name: "🧱 Muro", value: bestCity ? `\`${bestCity.wall}\`` : "`-`", inline: true }, { name: "🪖 Tropas Necesarias", value: neededTroops ? `\`${(0, utils_1.formatUnit)(neededTroops)}\`` : "`-`", inline: true })
        .setFooter({ text: "Million Lords — Calculadora de Poder de Ataque" })
        .setTimestamp()
        .setColor("Red");
    await interaction.reply({
        embeds: [embed],
        flags: discord_js_1.MessageFlags.SuppressNotifications
    });
})
    .addNumberOption(opt => opt
    .setName("troops")
    .setDescription("Cantidad de tropas (solo número)")
    .setRequired(true))
    .addStringOption(opt => opt
    .setName("unit")
    .setDescription("Unidad (K/M/G/T/P)")
    .setRequired(true)
    .addChoices({ name: "K", value: "K" }, { name: "M", value: "M" }, { name: "G", value: "G" }, { name: "T", value: "T" }, { name: "P", value: "P" }))
    .addNumberOption(opt => opt
    .setName("bonus")
    .setDescription("Bonus de ataque (%)")
    .setRequired(true));

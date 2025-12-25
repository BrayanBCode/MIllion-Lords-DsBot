"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
const utils_1 = require("../../utils/utils");
const discord_js_1 = require("discord.js");
exports.default = new Command_1.Command()
    .setName("upcities")
    .setDescription("Calcula cuanto oro necesitas para mejorar varias ciudades a cierto nivel.")
    .setExecute(async (client, interaction) => {
    const cityLevel = interaction.options.getNumber("newlevel", true);
    const startLevel = interaction.options.getNumber("startlevel", true);
    const amount = interaction.options.getNumber("amount", true);
    if (startLevel >= cityLevel) {
        return interaction.reply({
            content: "❌ El nivel inicial debe ser menor al nivel objetivo.",
            ephemeral: true
        });
    }
    // niveles intermedios
    const levelsToUpgrade = utils_1.WALL_DATA.filter(c => c.level >= startLevel && c.level <= cityLevel);
    if (!levelsToUpgrade.length) {
        return interaction.reply({
            content: "❌ No se encontraron datos para esos niveles.",
            ephemeral: true
        });
    }
    // Costo total para UNA ciudad
    const goldPerCity = levelsToUpgrade.reduce((acc, lvl) => {
        return acc + (0, utils_1.parseWallValue)(lvl.upgradeCost);
    }, 0);
    // Costo total para TODAS las ciudades
    const totalGold = goldPerCity * amount;
    return interaction.reply({
        embeds: [
            new discord_js_1.EmbedBuilder()
                .setTitle("💰 Costo de Mejora de Ciudades")
                .setDescription(`\n` +
                `- 🏷️ Nivel Inicial: \`${startLevel}\`\n` +
                `- 🏷️ Nivel Objetivo: \`${cityLevel}\`\n` +
                `- 🏘️ Cantidad de Ciudades: \`${amount}\`\n` +
                `- 💵 Oro por Ciudad: \`${(0, utils_1.formatUnit)(goldPerCity)}\`\n` +
                `- 💸 Oro Total: \`${(0, utils_1.formatUnit)(totalGold)}\``)
                .setFooter({ text: "Million Lords — Calculadora de Mejora de Ciudades" })
                .setTimestamp()
                .setColor("Yellow")
        ],
        flags: discord_js_1.MessageFlags.SuppressNotifications
    });
})
    .addNumberOption(opt => opt
    .setName("startlevel")
    .setDescription("Nivel inicial de las ciudades que deseas mejorar")
    .setRequired(true))
    .addNumberOption(opt => opt
    .setName("amount")
    .setDescription("Cantidad de ciudades que deseas mejorar")
    .setRequired(true))
    .addNumberOption(opt => opt
    .setName("newlevel")
    .setDescription("Nivel al cual deseas mejorar las ciudades")
    .setRequired(true));

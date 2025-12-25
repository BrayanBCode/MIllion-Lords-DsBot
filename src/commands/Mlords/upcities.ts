import { Command } from "../Command";
import { formatUnit, parseWallValue, WALL_DATA } from "../../utils/utils";
import { EmbedBuilder, MessageFlags } from "discord.js";
import logger from "../../core/logger";

export default new Command()
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
        const levelsToUpgrade = WALL_DATA.filter(
            c => c.level >= startLevel && c.level <= cityLevel
        );

        if (!levelsToUpgrade.length) {
            return interaction.reply({
                content: "❌ No se encontraron datos para esos niveles.",
                ephemeral: true
            });
        }

        // Costo total para UNA ciudad
        const goldPerCity = levelsToUpgrade.reduce((acc, lvl) => {
            return acc + parseWallValue(lvl.upgradeCost);
        }, 0);

        // Costo total para TODAS las ciudades
        const totalGold = goldPerCity * amount;


        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("💰 Costo de Mejora de Ciudades")
                    .setDescription(
                        `\n` +
                        `- 🏷️ Nivel Inicial: \`${startLevel}\`\n` +
                        `- 🏷️ Nivel Objetivo: \`${cityLevel}\`\n` +
                        `- 🏘️ Cantidad de Ciudades: \`${amount}\`\n` +
                        `- 💵 Oro por Ciudad: \`${formatUnit(goldPerCity)}\`\n` +
                        `- 💸 Oro Total: \`${formatUnit(totalGold)}\``)
                    .setFooter({ text: "Million Lords — Calculadora de Mejora de Ciudades" })
                    .setTimestamp()
                    .setColor("Yellow")
            ],
            flags: MessageFlags.SuppressNotifications
        });
    })
    .addNumberOption(opt =>
        opt
            .setName("startlevel")
            .setDescription("Nivel inicial de las ciudades que deseas mejorar")
            .setRequired(true)
    )
    .addNumberOption(opt =>
        opt
            .setName("amount")
            .setDescription("Cantidad de ciudades que deseas mejorar")
            .setRequired(true)
    )
    .addNumberOption(opt =>
        opt
            .setName("newlevel")
            .setDescription("Nivel al cual deseas mejorar las ciudades")
            .setRequired(true)
    )

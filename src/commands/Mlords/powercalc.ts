// commands/power.ts
import { EmbedBuilder, MessageFlags } from "discord.js";
import { UNIT_MAP, WALL_DATA, calculatePower, formatUnit, parseWallValue } from "../../utils/utils";
import { Command } from "../Command";

export default new Command()
    .setName("powercalc")
    .setDescription("Calcula el poder total de tus tropas.")
    .setExecute(async (client, interaction) => {

        const troops = interaction.options.getNumber("troops", true);
        const unit = interaction.options.getString("unit", true).toUpperCase();
        const bonus = interaction.options.getNumber("bonus", true);

        const multiplier = UNIT_MAP[unit];
        const realTroops = troops * multiplier;

        const power = calculatePower(realTroops, bonus);

        const availableCities = WALL_DATA.filter(c => parseWallValue(c.wall) <= power);
        const bestCity = availableCities.length > 0 ? availableCities[availableCities.length - 1] : null;

        let neededTroops = null;

        if (bestCity) {
            const wallValue = parseWallValue(bestCity.wall);
            neededTroops = wallValue / (1 + bonus / 100);
        }

        const embed = new EmbedBuilder()
            .setTitle("⚔️ Poder de Ataque")
            .addFields(
                { name: "🪖 tropas", value: `\`${troops}${unit}\``, inline: true },
                { name: "📈 Bonus", value: `\`${bonus}%\``, inline: true },
                { name: "⚔️ Poder Total", value: `\`${formatUnit(power)}\``, inline: true },

                { name: "🏰 Ciudad", value: bestCity ? `\`${bestCity.level}\`` : "`No city`", inline: true },
                { name: "🧱 Muro", value: bestCity ? `\`${bestCity.wall}\`` : "`-`", inline: true },
                { name: "🪖 Tropas Necesarias", value: neededTroops ? `\`${formatUnit(neededTroops)}\`` : "`-`", inline: true }
            )
            .setFooter({ text: "Million Lords — Calculadora de Poder de Ataque" })
            .setTimestamp()
            .setColor("Red");

        await interaction.reply({
            embeds: [embed],
            flags: MessageFlags.SuppressNotifications
        });
    })
    .addNumberOption(opt =>
        opt
            .setName("troops")
            .setDescription("Cantidad de tropas (solo número)")
            .setRequired(true)
    )
    .addStringOption(opt =>
        opt
            .setName("unit")
            .setDescription("Unidad (K/M/G/T/P)")
            .setRequired(true)
            .addChoices(
                { name: "K", value: "K" },
                { name: "M", value: "M" },
                { name: "G", value: "G" },
                { name: "T", value: "T" },
                { name: "P", value: "P" }
            )
    )
    .addNumberOption(opt =>
        opt
            .setName("bonus")
            .setDescription("Bonus de ataque (%)")
            .setRequired(true)
    )
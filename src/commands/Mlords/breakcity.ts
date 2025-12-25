import { EmbedBuilder, MessageFlags } from "discord.js";
import { WALL_DATA, parseWallValue, calculateNeededTroopsFromWallValue, formatUnit } from "../../utils/utils";
import { Command } from "../Command";

export default new Command()
    .setName("breakcity")
    .setDescription("Calcula cuántas tropas necesitas para romper una ciudad (por nivel).")
    .setExecute(async (client, interaction) => {
        const level = interaction.options.getNumber("level", true);
        const bonus = interaction.options.getNumber("bonus", true);

        const entry = WALL_DATA.find(w => w.level === level);
        if (!entry) {
            return interaction.reply({ content: `❌ No encontré datos para el nivel ${level}.`, ephemeral: true });
        }

        const wallValue = parseWallValue(entry.wall); // número real
        const needed = calculateNeededTroopsFromWallValue(wallValue, bonus);

        const embed = new EmbedBuilder()
            .setTitle(`🪖 Tropas necesarias`)
            .setDescription(
                `Tropas necesarias para romper una ciudad segun nivel\n` +
                `- 🏰 Nivel de Ciudad: \`${entry.level}\`\n` +
                `- 🧱 Muro: \`${entry.wall}\`\n` +
                `- 📈 Bonus de Ataque: \`${bonus}%\`\n` +
                `- 🪖 Tropas Necesarias: \`${formatUnit(needed)}\``)
            .setFooter({ text: "Million Lords — Calculadora de Tropas Necesarias" })
            .setTimestamp()
            .setColor("DarkOrange");

        await interaction.reply({
            embeds: [embed],
            flags: MessageFlags.SuppressNotifications
        });
    })
    .addNumberOption(opt =>
        opt
            .setName("level")
            .setDescription("Nivel de la ciudad (ej: 33)")
            .setRequired(true)
    )
    .addNumberOption(opt =>
        opt
            .setName("bonus")
            .setDescription("Bonus de ataque (%) (ej: 200)")
            .setRequired(true)
    )

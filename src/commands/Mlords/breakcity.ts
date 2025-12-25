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
            .setTitle(`🪖 Tropas necesarias - Nivel ${level}`)
            .addFields(
                { name: "lvl", value: `\`${level}\``, inline: true },
                { name: "Wall", value: `\`${entry.wall}\``, inline: true },
                { name: "Bonus", value: `\`${bonus}%\``, inline: true },
                { name: "needed troops", value: `\`${formatUnit(needed)}\``, inline: false }
            )
            .setFooter({ text: "Million Lords — Calculadora de Tropas Necesarias" })
            .setTimestamp()
            .setColor("Green");

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

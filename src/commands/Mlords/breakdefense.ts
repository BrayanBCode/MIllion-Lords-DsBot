import { EmbedBuilder, MessageFlags } from "discord.js";
import { UNIT_MAP, formatUnit } from "../../utils/utils";
import { Command } from "../Command";

export default new Command()
    .setName("breakdefense")
    .setDescription("Calcula cuantas tropas necesitas para atacar una ciudad segun su defensa total.")
    .setExecute(async (client, interaction) => {

        const defense = interaction.options.getNumber("totaldefense", true);
        const unit = interaction.options.getString("unit", true).toUpperCase();
        const bonus = interaction.options.getNumber("bonus", true);

        const multiplier = UNIT_MAP[unit];
        const realDefense = defense * multiplier;

        const neededTroops = realDefense / (1 + bonus / 100);

        const embed = new EmbedBuilder()
            .setTitle("🧮 Tropas necesarias")
            .setDescription(
                `Tropas necesarias para romper una ciudad segun su defensa total\n` +
                `- 🛡️ Defensa Total: \`${formatUnit(realDefense)}\`\n` +
                `- 📈 Bono de Ataque: \`${bonus}%\`\n` +
                `- 🪖 Tropas Necesarias: \`${formatUnit(neededTroops)}\``
            )

            .setFooter({ text: "Million Lords — Calculadora de Tropas Necesarias" })
            .setTimestamp()
            .setColor("Orange");

        await interaction.reply({
            embeds: [embed],
            flags: MessageFlags.SuppressNotifications
        });
    })
    .addNumberOption(opt =>
        opt.setName("totaldefense")
            .setDescription("Defensa total de la ciudad (solo número)")
            .setRequired(true)
    )
    .addStringOption(opt =>
        opt.setName("unit")
            .setDescription("Unidad de defensa (K, M, G, T, P)")
            .setRequired(true)
    )
    .addNumberOption(opt =>
        opt.setName("bonus")
            .setDescription("Bonus de ataque (%)")
            .setRequired(true)
    )

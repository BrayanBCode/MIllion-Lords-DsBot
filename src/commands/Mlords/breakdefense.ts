import { EmbedBuilder, MessageFlags } from "discord.js";
import { UNIT_MAP, formatUnit } from "../../utils/utils";
import { Command } from "../Command";

export default new Command()
    .setName("breakdefense")
    .setDescription("Calcula cuantas tropas necesitas para atacar una ciudad segun su defensa total.")
    .setExecute(async (client, interaction) => {

        const defense = interaction.options.getNumber("totaldefense", true);
        const unit = interaction.options.getString("unit", true).toUpperCase();
        const bonus = interaction.options.getNumber("bonusattack", true);

        const multiplier = UNIT_MAP[unit];
        const realDefense = defense * multiplier;

        const neededTroops = realDefense / (1 + bonus / 100);

        const embed = new EmbedBuilder()
            .setTitle("🧮 Tropas necesarias")
            .addFields(
                { name: "🧱 Defensa Total", value: `\`${defense}${unit}\``, inline: true },
                { name: "📈 Bono de Ataque", value: `\`${bonus}%\``, inline: true },
                { name: "🪖 Tropas Necesarias", value: `\`${formatUnit(neededTroops)}\``, inline: true }
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
            .setDescription("Defense amount (just the number)")
            .setRequired(true)
    )
    .addStringOption(opt =>
        opt.setName("unit")
            .setDescription("Unit of defense (K, M, G, T, P)")
            .setRequired(true)
    )
    .addNumberOption(opt =>
        opt.setName("bonusattack")
            .setDescription("Your attack bonus (%)")
            .setRequired(true)
    )

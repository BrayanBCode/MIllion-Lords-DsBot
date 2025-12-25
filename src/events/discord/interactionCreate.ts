import { ChatInputCommandInteraction, AutocompleteInteraction, CacheType, Interaction } from "discord.js";
import { Event } from "../Event";
import { BotClient } from "../../core/BotClient";
import logger from "../../core/logger";

export default class interactionCreate extends Event<"interactionCreate"> {
    constructor() {
        super("interactionCreate", false);
    }

    execute(Client: BotClient, interaction: Interaction<CacheType>): Promise<void> | void {

        if (interaction.isChatInputCommand()) {
            const cmd = Client.commands.get(interaction.commandName);
            if (!cmd?.getExecute) return;

            try {
                cmd.getExecute(Client, interaction as ChatInputCommandInteraction<"cached">);
                logger.info(`Comando ejecutado: ${interaction.commandName} | Usuario: ${interaction.user.tag} | Servidor: ${interaction.guild ? interaction.guild.name : "DM"}`);
            } catch (error) {
                console.error(error);
                interaction.reply({ content: "❌ | Ocurrió un error al ejecutar este comando.", ephemeral: true });
            }
        }

        if (interaction.isAutocomplete()) {
            const cmd = Client.commands.get(interaction.commandName);
            if (!cmd?.getAutocomplete) return;

            try {
                cmd.getAutocomplete(Client, interaction as AutocompleteInteraction);
            } catch (error) {
                console.error(error);
            }
        }
    }

}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const logger_1 = __importDefault(require("../../core/logger"));
class interactionCreate extends Event_1.Event {
    constructor() {
        super("interactionCreate", false);
    }
    execute(Client, interaction) {
        if (interaction.isChatInputCommand()) {
            const cmd = Client.commands.get(interaction.commandName);
            if (!cmd?.getExecute)
                return;
            try {
                cmd.getExecute(Client, interaction);
                logger_1.default.info(`Comando ejecutado: ${interaction.commandName} | Usuario: ${interaction.user.tag} | Servidor: ${interaction.guild ? interaction.guild.name : "DM"}`);
            }
            catch (error) {
                console.error(error);
                interaction.reply({ content: "❌ | Ocurrió un error al ejecutar este comando.", ephemeral: true });
            }
        }
        if (interaction.isAutocomplete()) {
            const cmd = Client.commands.get(interaction.commandName);
            if (!cmd?.getAutocomplete)
                return;
            try {
                cmd.getAutocomplete(Client, interaction);
            }
            catch (error) {
                console.error(error);
            }
        }
    }
}
exports.default = interactionCreate;

import { ChatInputCommandInteraction, AutocompleteInteraction, SlashCommandBuilder } from "discord.js";
import { BotClient } from "../core/BotClient";

interface CommandOptions { name: string, description: string }

declare type InteractionExecuteFN = (client: BotClient, interaction: ChatInputCommandInteraction<"cached">) => any;
declare type AutoCompleteExecuteFN = (client: BotClient, interaction: AutocompleteInteraction) => any

export class Command extends SlashCommandBuilder {
    private execute?: InteractionExecuteFN;
    private autocomplete?: AutoCompleteExecuteFN;

    public setExecute(method: InteractionExecuteFN) {
        this.execute = method;
        return this;
    }
    public setAutoComplete(method: AutoCompleteExecuteFN) {
        this.autocomplete = method;
        return this;
    }

    public get getExecute() {
        return this.execute;
    }

    public get getAutocomplete() {
        return this.autocomplete;
    }

    // public toJson() {
    //     return {
    //         name: this.name,
    //         description: this.description,
    //     };
    // }

}
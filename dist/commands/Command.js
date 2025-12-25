"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const discord_js_1 = require("discord.js");
class Command extends discord_js_1.SlashCommandBuilder {
    setExecute(method) {
        this.execute = method;
        return this;
    }
    setAutoComplete(method) {
        this.autocomplete = method;
        return this;
    }
    get getExecute() {
        return this.execute;
    }
    get getAutocomplete() {
        return this.autocomplete;
    }
}
exports.Command = Command;

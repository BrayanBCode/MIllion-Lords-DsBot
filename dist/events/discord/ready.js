"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const logger_1 = __importDefault(require("../../core/logger"));
class OnReady extends Event_1.Event {
    constructor() {
        super("clientReady", true);
    }
    execute(Client, client) {
        logger_1.default.info(`🤖 Conectado como ${client.user.tag} (ID: ${client.user.id})`);
    }
}
exports.default = OnReady;

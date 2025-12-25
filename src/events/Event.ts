import { ClientEvents } from "discord.js";
import { BotClient } from "../core/BotClient";


export abstract class Event<K extends keyof ClientEvents> {
    public readonly name: K;
    public readonly once: boolean;

    constructor(name: K, once = false) {
        this.name = name;
        this.once = once ?? false;
    }

    abstract execute(Client: BotClient, ...args: ClientEvents[K]): Promise<void> | void;

}

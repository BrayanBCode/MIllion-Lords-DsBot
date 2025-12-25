"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor(name, once = false) {
        this.name = name;
        this.once = once ?? false;
    }
}
exports.Event = Event;

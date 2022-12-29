import { Event, EventType } from "@structures/Event";
import { Events } from "discord.js";

class DebugEvent extends Event {
    public static readonly eventName = Events.Debug;
    public static readonly eventType = EventType.Client;

    public execute(info: string): void {
        // console.log(`[DEBUG] ${info}`);
    }
}

export default DebugEvent;
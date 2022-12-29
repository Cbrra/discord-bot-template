import { Events } from "discord.js";
import { Event, EventType } from "@structures/Event";

class ReadyEvent extends Event {
    public static readonly eventName = Events.ClientReady;
    public static readonly eventType = EventType.Client;

    public execute(): void {
        console.log(`Client logged in as ${this.client.user.tag}`);
    }
}

export default ReadyEvent;
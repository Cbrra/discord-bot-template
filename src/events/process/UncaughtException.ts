import { Event, EventType } from "@structures/Event";

class UncaughtExceptionEvent extends Event {
    public static readonly eventName = "uncaughtException";
    public static readonly eventType = EventType.Process;

    public execute(error: Error, origin: NodeJS.UncaughtExceptionOrigin): void {
        console.error(`UncaughtException`);
        console.error(error);
    }
}

export default UncaughtExceptionEvent;
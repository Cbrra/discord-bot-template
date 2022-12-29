import type Bot from "./Bot";

export interface IEventFile {
    readonly eventName: string;
    readonly eventType: EventType;
    new(client: Bot): Event & {
        execute(...args: unknown[]): void | Promise<void>;
    }
}

export enum EventType {
    Process,
    Client,
    Rest,
    Custom
}

export abstract class Event {
    public static readonly eventName: string;
    public static readonly eventType: EventType;
    public disabled: boolean = false;
    public constructor(readonly client: Bot<true>) {
        this.client = client;
    }
}
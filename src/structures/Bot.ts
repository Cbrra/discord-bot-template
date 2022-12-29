import process from "node:process";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { Client, Collection, type ClientOptions } from "discord.js";
import type { Command, ICommandFile } from "./Command";
import { EventType, type Event, type IEventFile } from "./Event";

class Bot<Ready extends boolean = boolean> extends Client<Ready> {
    public readonly commands: Collection<string, Command>;
    public readonly events: Collection<string, Event>;

    public constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
        this.events = new Collection();

        this.loadCommands();
        this.loadEvents();
    }

    private async loadCommands(): Promise<void> {
        const commandsPath = join(process.cwd(), "src", "commands");
        const commandFolders = readdirSync(commandsPath);

        for(const folder of commandFolders) {
            const commandFiles = readdirSync(join(commandsPath, folder)).filter(file => file.endsWith(".ts"));

            for(const file of commandFiles) {
                const filePath = join(commandsPath, folder, file);
                const ImportedCommand: ICommandFile = (await import(filePath)).default;

                if("data" in ImportedCommand) {
                    this.commands.set(ImportedCommand.data.name, new ImportedCommand(this));
                    console.log(`Command loaded: ${ImportedCommand.data.name}`);
                } else {
                    console.warn(`[WARNING] The command at ${filePath} is missing a required "data" property.`);
                }
            }
        }
    }

    private async loadEvents(): Promise<void> {
        const eventsPath = join(process.cwd(), "src", "events");
        const eventFolders = readdirSync(eventsPath);

        for(const folder of eventFolders) {
            const eventFiles = readdirSync(join(eventsPath, folder)).filter(file => file.endsWith(".ts"));

            for(const file of eventFiles) {
                const filePath = join(eventsPath, folder, file);
                const ImportedEvent: IEventFile = (await import(filePath)).default;

                if("eventName" in ImportedEvent && "eventType" in ImportedEvent) {
                    const event = new ImportedEvent(this);
                    this.events.set(ImportedEvent.eventName, event);

                    let eventEmitter: NodeJS.EventEmitter | undefined;

                    switch(ImportedEvent.eventType) {
                        case EventType.Process:
                            eventEmitter = process;
                            break;
                        case EventType.Custom:
                        case EventType.Client:
                            eventEmitter = this;
                            break;
                        case EventType.Rest:
                            eventEmitter = this.rest;
                            break;
                    }

                    eventEmitter?.on(ImportedEvent.eventName, async(...args) => {
                        try {
                            if(event.disabled) return;
                            await event.execute(...args);
                        } catch(error) {
                            console.error(`Error executing event ${ImportedEvent.eventName}`);
                            console.error(error);
                        }
                    });

                    console.log(`Event loaded: ${ImportedEvent.eventName}`);
                } else {
                    console.warn(`[WARNING] The event at ${filePath} is missing a required "eventName" or "eventType" property.`);
                }
            }
        }
    }
}

export default Bot;
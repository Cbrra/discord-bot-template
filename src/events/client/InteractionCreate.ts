import { Events, type BaseInteraction, type ChatInputCommandInteraction, type ContextMenuCommandInteraction, type AutocompleteInteraction } from "discord.js";
import { Event, EventType } from "@structures/Event";

class InteractionCreateEvent extends Event {
    public static readonly eventName = Events.InteractionCreate;
    public static readonly eventType = EventType.Client;

    public execute(interaction: BaseInteraction): void {
        if(interaction.isChatInputCommand()) this.executeChatInputCommand(interaction);
        else if(interaction.isAutocomplete()) this.executeAutocompleteCommand(interaction);
        else if(interaction.isContextMenuCommand()) this.executeContextMenuCommand(interaction);
    }

    public async executeChatInputCommand(interaction: ChatInputCommandInteraction) {
        const command = this.client.commands.get(interaction.commandName);

        if(!command || typeof command.execute !== "function") {
            console.error(`No command matching ${interaction.commandName} was found or the command is missing a "execute" function.`);
            return;
        }

        if(command.disabled) return;

        try {
            await command.execute(interaction);
        } catch(error) {
            console.error(`Error executing chatinput command ${interaction.commandName}`);
            console.error(error);
        }
    }

    public async executeAutocompleteCommand(interaction: AutocompleteInteraction) {
        const command = this.client.commands.get(interaction.commandName);

        if(!command || typeof command.executeAutocomplete !== "function") {
            console.error(`No command matching ${interaction.commandName} was found or the command is missing a "executeAutocomplete" function.`);
            return;
        }

        if(command.disabled) return;

        try {
            await command.executeAutocomplete(interaction);
        } catch(error) {
            console.error(`Error executing autocomplete on command ${interaction.commandName}`);
            console.error(error);
        }
    }

    public async executeContextMenuCommand(interaction: ContextMenuCommandInteraction) {
        const command = this.client.commands.get(interaction.commandName);

        if(!command || typeof command.executeContext !== "function") {
            console.error(`No command matching ${interaction.commandName} was found or the command is missing a "executeContext" function.`);
            return;
        }

        if(command.disabled) return;

        try {
            await command.executeContext(interaction);
        } catch(error) {
            console.error(`Error executing context command ${interaction.commandName}`);
            console.error(error);
        }
    }
}

export default InteractionCreateEvent;

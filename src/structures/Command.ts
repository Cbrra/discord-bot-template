import type { SlashCommandBuilder, ChatInputCommandInteraction, ContextMenuCommandInteraction, AutocompleteInteraction } from "discord.js";
import type Bot from "./Bot";

export interface ICommandFile {
    readonly data: SlashCommandBuilder;
    new(client: Bot): Command;
}

export abstract class Command {
    public static readonly data: SlashCommandBuilder;
    public disabled: boolean = false;
    public constructor(readonly client: Bot<true>) {
        this.client = client;
    }

    public execute?(interaction: ChatInputCommandInteraction): Promise<void>;
    public executeContext?(interaction: ContextMenuCommandInteraction): Promise<void>;
    public executeAutocomplete?(interaction: AutocompleteInteraction): Promise<void>;
}
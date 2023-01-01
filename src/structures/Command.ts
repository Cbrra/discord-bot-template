import type {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
    SlashCommandSubcommandsOnlyBuilder,
    ChatInputCommandInteraction,
    ContextMenuCommandInteraction,
    AutocompleteInteraction
} from "discord.js";
import type Bot from "./Bot";

export enum CommandCategory {
    Bot,
    Informations
}

export interface ICommandData {
    readonly name: string;
    readonly category: CommandCategory;
    readonly slashBuilder: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandSubcommandGroupBuilder;
}

export interface ICommandFile {
    readonly data: ICommandData;
    new(client: Bot): Command;
}

export abstract class Command {
    public static readonly data: ICommandData;
    public disabled: boolean = false;
    protected constructor(readonly client: Bot<true>, readonly data: ICommandData) {
        this.client = client;
        this.data = data;
    }

    public execute?(interaction: ChatInputCommandInteraction): Promise<void>;
    public executeContext?(interaction: ContextMenuCommandInteraction): Promise<void>;
    public executeAutocomplete?(interaction: AutocompleteInteraction): Promise<void>;
}

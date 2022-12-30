import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import type Bot from "@structures/Bot";
import { Command, CommandCategory } from "@structures/Command";

class PingCommand extends Command {
    public static readonly data = {
        name: "ping",
        category: CommandCategory.Bot,
        slashBuilder: new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Get the bot latency")
    }

    public constructor(client: Bot<true>) {
        super(client, PingCommand.data);
    }

    public async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply(`WebSocket latency: ${this.client.ws.ping}ms`);
    }
}

export default PingCommand;

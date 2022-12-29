import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import { Command } from "@structures/Command";

class PingCommand extends Command {
    public static readonly data = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Get the bot latency");

    public async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply(`WebSocket latency: ${this.client.ws.ping}ms`);
    }
}

export default PingCommand;
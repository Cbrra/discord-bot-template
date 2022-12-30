import { EmbedBuilder, SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import type Bot from "@structures/Bot";
import { Command, CommandCategory } from "@structures/Command";

const categoriesTranslations = {
    [CommandCategory.Bot]: "Bot",
    [CommandCategory.Informations]: "Informations"
}

class HelpCommand extends Command {
    public static readonly data = {
        name: "help",
        category: CommandCategory.Informations,
        slashBuilder: new SlashCommandBuilder()
            .setName("help")
            .setDescription("Get the commands list")
    }

    public constructor(client: Bot<true>) {
        super(client, HelpCommand.data);
    }

    public async execute(interaction: ChatInputCommandInteraction) {
        const fields: [CommandCategory, string[]][] = [];

        for(const c of this.client.commands.values()) {
            const index = fields.findIndex(f => f[0] == c.data.category);
            const text = `${c.data.name}${c.disabled ? " (disabled)" : ""}`;

            if(index != -1) fields[index][1].push(text);
            else fields.push([c.data.category, [text]]);
        }

        const embed = new EmbedBuilder()
            .setColor(0xffffff)
            .setTitle("Commands list")
            .setFields(
                fields.map(f => ({
                          // name -> Name
                    name: `${categoriesTranslations[f[0]] || "Unknown"}`,
                    value: f[1].join("\n")
                }))
            );

        await interaction.reply({ embeds: [embed] })
    }
}

export default HelpCommand;

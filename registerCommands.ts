import process from "node:process";
import { readdirSync } from "node:fs";
import { join } from "path";
import { REST, Routes, type RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { config } from "dotenv";
import type { ICommandFile } from "@structures/Command";

(async () => {
    const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

    const commandsPath = join(process.cwd(), "src", "commands");
    const commandFolders = readdirSync(commandsPath);

    for(const folder of commandFolders) {
        const commandFiles = readdirSync(join(commandsPath, folder)).filter(file => file.endsWith(".ts"));

        for(const file of commandFiles) {
            const filePath = join(commandsPath, folder, file);
            const ImportedCommand: ICommandFile = (await import(filePath)).default;

            if("data" in ImportedCommand) {
                commands.push(ImportedCommand.data.toJSON());
            } else {
                console.warn(`[WARNING] The command at ${filePath} is missing a required "data" property.`);
            }
        }
    }

    config();
    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
            { body: commands }
        );

        console.log(`Successfully reloaded ${(data as unknown[]).length} application (/) commands.`);
    } catch(error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
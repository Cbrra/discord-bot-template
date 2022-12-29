import process from "node:process";
import { GatewayIntentBits } from "discord.js";
import "dotenv/config";
import Bot from "@structures/Bot";

const client = new Bot({
    intents: GatewayIntentBits.Guilds |
        GatewayIntentBits.GuildMembers |
        GatewayIntentBits.GuildBans |
        GatewayIntentBits.GuildEmojisAndStickers
});

client.login(process.env.DISCORD_TOKEN);
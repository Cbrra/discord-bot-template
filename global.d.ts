import type { Snowflake } from "discord.js";

declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            NODE_ENV: "production" | "development";
            DISCORD_TOKEN: string | undefined;
            DISCORD_CLIENT_ID: Snowflake | undefined;
        }
    }
}
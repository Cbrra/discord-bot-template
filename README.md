# discord-bot-template

<p>
    <a href="https://discord.gg/424VSPq"><img src="https://img.shields.io/discord/687287209300197566?color=5865F2&logo=discord&logoColor=white" alt="Discord server"/></a>
</p>

## About
A template to start your Discord bot in Typescript with [discord.js](https://github.com/discordjs/discord.js)

<br>

# Installation
1. Install Node.js
2. Download the template
3. Add your bot's token and id in the .env file
4. Run `npm i`
5. Run `npm run register-commands`
6. Run `npm run start` (or `F5` to debug if you are on vscode)
7. Your bot should be online !

<br>

# To know
- You can rename the `src/structures/Bot.ts` file and its class by the name of your bot
- In your commands you can use the built-in async functions `execute`, `executeAutocomplete` and `executeContext` in relation to what your command does
- Commands and events loaded are added in `Bot#commands` and `Bot#events` respectively
- The `Command` and `Event` classes both have the `disabled` property which, once enabled, allows you to disable the desired command or event

<br>

# Help

Need help ? Join my [Discord server](https://discord.gg/424VSPq) and send [me](https://discord.com/users/619838036846575617) a private message !

require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents, Collection } = require("discord.js");

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});
client.commands = new Collection();

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const eventPath = path.join(eventsPath, file);
  const event = require(eventPath);

  if (event.once) {
    client.once(event.name, (...args) =>
      event.execute(...args, commands, rest, Routes)
    );
  } else {
    client.on(event.name, (...args) =>
      event.execute(...args, commands, rest, Routes)
    );
  }
}

client.login(process.env.TOKEN);

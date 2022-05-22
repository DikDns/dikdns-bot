require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  console.log("DikDns Bot is ready.");

  client.commands = new Collection();
  const commands = [];

  // Mengambil commands otomatis
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

  const CLIENT_ID = client.user.id;
  const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

  (async () => {
    try {
      if (process.env.DEV === "production") {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        });
        console.log("Succesfully registered commands globally.");
      } else {
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
          {
            body: commands,
          }
        );
        console.log("Succesfully registered commands locally.");
      }
    } catch (error) {
      if (error) console.log(error);
    }
  })();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    if (error) console.log(error);

    await interaction.reply({
      content: "an Error occured while executing that command!",
      ephemeral: true,
    });
  }
});

client.on("messageCreate", (message) => {
  if (!message.content[0] === "!") return;

  if (message.content.substring(1) === "ping") {
    message.reply("Pong!");
  }
});

client.login(process.env.TOKEN);

require("dotenv").config();
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  console.log("DikDns Bot is ready.");
});

client.on("messageCreate", (message) => {
  if (!message.content[0] === "!") return;

  if (message.content.substring(1) === "ping") {
    message.reply("Pong!");
  }
});

client.login(process.env.TOKEN);

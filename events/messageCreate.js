module.exports = {
  name: "messageCreate",
  async execute(client) {
    client.on("messageCreate", (message) => {
      if (!message.content[0] === "!") return;

      if (message.content.substring(1) === "ping") {
        message.reply("Pong!");
      }
    });
  },
};

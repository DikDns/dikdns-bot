const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Replies what you want.")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What message?")
        .setRequired(true)
    ),
  async execute(interaction) {
    interaction.reply({
      content: interaction.options.getString("message"),
      ephemeral: true,
    });
  },
};

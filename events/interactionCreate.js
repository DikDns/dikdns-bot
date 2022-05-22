module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

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
  },
};

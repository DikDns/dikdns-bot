// const Discord = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    // const newMemberEmebed = new Discord.MessageEmbed()
    //   .setColor("#25CDFC")
    //   .setTitle("New Member!")
    //   .setDescription(
    //     `${member.user} has joined the server!\nWe hope you enjoy your stay!`
    //   )
    //   .setThumbnail(member.user.displayAvatarURL())
    //   .setTimestamp();

    member.guild.channels.cache
      .get("912507318929858600")
      .send(
        `${member.user} has joined the server!\nWe hope you enjoy your stay!`
      );
  },
};

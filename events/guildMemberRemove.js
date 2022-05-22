// const Discord = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  async execute(member) {
    // const newMemberEmebed = new Discord.MessageEmbed()
    //   .setColor("#25CDFC")
    //   .setTitle("Goodbye!")
    //   .setDescription(`${member.user} has left the server!`)
    //   .setThumbnail(member.user.displayAvatarURL())
    //   .setTimestamp();

    member.guild.channels.cache
      .get("912507318929858600")
      .send(`${member.user} has left the server!`);
  },
};

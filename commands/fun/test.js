const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Testing feature to figure out how certain methods work"),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        {
          title: "Check console",
        },
      ],
    });

    const collector = interaction.channel.createMessageCollector({
      time: 1000 * 5,
    });

    collector.on("collect", (m) => {
      console.log(m);
    });

    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} messages`);
    });
  },
};

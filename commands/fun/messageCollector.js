const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("messagecollector_template")
    .setDescription("template to use #messageCollector"),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        {
          title: "Collecting messages",
        },
      ],
    });

    const collector = interaction.channel.createMessageCollector({
      time: 1000 * 5,
    });

    // Sends a message in the chat
    // interaction.channel.send("poo");

    collector.on("collect", (m) => {
      console.log(m);
    });

    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} messages`);
      interaction.channel.send({
        embeds: [
          {
            title: "End of collecting messages",
          },
        ],
      });
    });
  },
};

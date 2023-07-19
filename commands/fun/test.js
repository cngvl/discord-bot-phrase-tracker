const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Testing feature to figure out messageCollector works"),
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

    // Sends a message in the chat
    interaction.channel.send("poo");

    collector.on("collect", (m) => {
      console.log("collector.on - collect");
      console.log(m);
      // if (counter < questions.length) {
      //   m.channel.send(questions[counter++]);
      // }
    });

    collector.on("end", (collected) => {
      console.log("collector.on - end");
      console.log(`Collected ${collected.size} messages`);

      // let counter = 0;
      // collected.forEach((value) => {
      //   console.log(questions[counter++], value.content);
      // });
    });
  },
};

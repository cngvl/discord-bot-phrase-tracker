const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Message collector test function")
    .addStringOption((option) =>
      option.setName("input").setDescription("The input to echo back")
    ),
  async execute(interaction) {
    await interaction.reply("poo");
    console.log(interaction);
    // `m` is a message object that will be passed through the filter function
    const collectorFilter = (m) => m.content;
    // const collectorFilter = (m) => m.content.includes("discord");
    // // const channel = interaction.channel;

    // const collector = interaction.channel.createMessageCollector({
    //   time: 1000 * 10,
    // });

    // collector.on("collect", (m) => {
    //   console.log(`Collect`);
    //   console.log(`Collected ${m.content}`);
    // });

    // collector.on("end", (collected) => {
    //   console.log("end");
    //   console.log(collected);
    //   console.log(`Collected ${collected.size} items`);
    // });
    // const userInput = interaction.options.getString("input");
  },
};

// client.on(Events.InteractionCreate, (interaction) => {
//   console.log("TESING");
//   console.log(interaction);
// });

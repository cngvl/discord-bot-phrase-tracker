const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Message collector test function")
    .addStringOption((option) =>
      option.setName("input").setDescription("The input to echo back")
    ),
  async execute(interaction) {
    console.log("interaction.options.getRequired");
    const userInput = interaction.options.getString("input");
  },
};

// `m` is a message object that will be passed through the filter function
const collectorFilter = (m) => m.content.includes("discord");
const collector = interaction.channel.createMessageCollector({
  filter: collectorFilter,
  time: 15000,
});

collector.on("collect", (m) => {
  console.log(`Collected ${m.content}`);
});

collector.on("end", (collected) => {
  console.log(`Collected ${collected.size} items`);
});

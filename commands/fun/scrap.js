const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("scrap")
    .setDescription("Storing scrapped code that I might use at a later time"),
  async execute(interaction) {
    await interaction.reply("poo");
    await interaction.reply("poo");
    // console.log("START OF Interaction from inside test.js");
    // console.log(interaction);
    // console.log("END OF Interaction from inside test.js");
    // `m` is a message object that will be passed through the filter function
    // const collectorFilter = (m) => m.content;
    // const collectorFilter = (m) => m.content.includes("discord");
    // // const channel = interaction.channel;

    // const collector = interaction.channel.createMessageCollector({
    //   time: 1000 * 10,
    // });

    // console.log("collector");
    // console.log(collector);

    // // This code block doesn't fire because this is INSIDE? an event handler which is probably not what I want?
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

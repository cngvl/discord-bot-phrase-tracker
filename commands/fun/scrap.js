const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("scrap")
    .setDescription("Storing scrapped code that I might use at a later time"),
  async execute(interaction) {
    await interaction.reply("poo");

    // Sends a message in the chat
    // interaction.channel.send("poo");

    // Sends an embedded message in chat
    // interaction.channel.send({
    //   embeds: [
    //     {
    //       title: "End of collecting messages",
    //     },
    //   ],
    // });
  },
};

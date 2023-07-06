const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Repeats whatever phrase you input")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("ephemeral")
        .setDescription("Whether or not the echo should be ephemeral")
    ),
  async execute(interaction) {
    console.log(interaction.options.getRequired);
    const userInput = interaction.options.getString("input");
    await interaction.reply(userInput);
  },
};
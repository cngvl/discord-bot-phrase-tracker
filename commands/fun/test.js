const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Repeats whatever phrase you input")
    .addBooleanOption((option) =>
      option
        .setName("ephemeral")
        .setDescription("Whether or not the echo should be ephemeral")
    ),
  async execute(interaction) {
    await interaction.reply("interaction");
  },
};

const { SlashCommandBuilder } = require("discord.js");

// Everything is placed within module.exports so that it can be read by other files
// ( command loader and command deployment scripts )
// module.exports is how to export data in node.js so it can be required in other files
module.exports = {
  // SlashCommandBuilder is a premade class that creates API-compatible JSON data for slash commands ( all the shit I've been reading in terminal )
  // At min the command needs name + desc
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};

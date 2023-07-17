const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Message collector test function")
    .addStringOption((option) =>
      option.setName("input").setDescription("The input to echo back")
    ),
  async execute(interaction) {
    // const msg_filter = (m) => m.author.id === message.author.id;
    // const collected = await message.channel.awaitMessages({ filter: msg_filter, max: 1 });

    // Or without async/await
    const msg_filter = (m) => m.content.includes("discord");
    message.channel
      .awaitMessages({ filter: msg_filter, max: 1 })
      .then((collected) => {
        console.log(collected);
      });
  },
};

// client.on(Events.InteractionCreate, (interaction) => {
//   console.log("TESING");
//   console.log(interaction);
// });

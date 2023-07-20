const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Testing feature to figure out how #fetch works"),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        {
          title: "Running test command - check console",
        },
      ],
    });

    const date1 = Date.now() - 10000;
    // console.log(new Date(date1));
    // console.log(date1);

    interaction.channel.messages
      .fetch({
        limit: 3,
        cache: false,
        after: date1, // The date time you want it from
      })
      .then((messages) => {
        console.log(`Received ${messages.size} messages`);
        console.log(messages);
        let counter = 1;
        messages.forEach((message) => {
          console.log(`Message #${counter}`);
          console.log(`${message.author.username}\n`);
          counter += 1;
        });
      })
      .catch(console.error);
  },
};

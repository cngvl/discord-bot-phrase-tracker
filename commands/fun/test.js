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

    dayMS = 86400000;
    const date = new Date();
    // const collectorFilter = (m) => m.content.includes("string");

    interaction.channel.messages
      .fetch({
        limit: 3,
        // cache: false,
        on: date, // The date time you want it from. can also use on:
        // filter: messages.content.length > 0,
      })
      .then((messages) => {
        // console.log(messages);
        let counter = 1;
        console.log(`Received ${messages.size} messages`);
        console.log(`Date: ${new Date(date)}`);
        console.log(`\n`);
        messages.forEach((message) => {
          console.log(`Message #${counter}`);
          console.log(`Username: ${message.author.username}`);
          var utcSeconds = message.createdTimestamp;
          var tryDate = new Date(utcSeconds);
          console.log(`Date: ${tryDate}`);
          // console.log(`ID: ${message.id}`);
          console.log(`Content: ${message.content}`);
          counter += 1;
          console.log(`\n`);
        });
      })
      .catch(console.error);
  },
};

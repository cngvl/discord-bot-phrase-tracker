const { SlashCommandBuilder } = require("discord.js");

// User should input the command, phrase, user and also a timeperiod of where they want to search
// Time periods should be some sort of optional menu?
// In the future I can branch out and make users / channel optional
// Fetch apparently? has a limit of 100 so it might make the UI a bit not vibes ya know

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Testing feature to figure out how #fetch works"),
  async execute(interaction) {
    // dayMS = 86400000;
    // const date = new Date();
    const date = Date.now();
    // const collectorFilter = (m) => m.content.includes("string");

    interaction.channel.messages
      .fetch({
        limit: 5,
        // around: date, // The date time you want it from. can also use on, before or after:
        // TODO: Need to figure out how to add some sort of filter for users
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

    await interaction.reply({
      embeds: [
        {
          title: "Running test command - check console",
        },
      ],
    });
  },
};

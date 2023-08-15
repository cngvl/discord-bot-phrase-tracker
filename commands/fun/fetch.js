const { SlashCommandBuilder } = require("discord.js");

// User should input the command, phrase, user and also a timeperiod of where they want to search
// Time periods should be some sort of optional menu?
// In the future I can branch out and make users / channel optional
// Fetch apparently? has a limit of 100 so it might make the UI a bit not vibes ya know
// Apparently, it is not currently possible for me to achieve this.
// Fetch is limited in that filters can only be applied AFTER, the messages have been fetched.
// Fetch cannot only search for messages that pass a filter, and it also has a maximum capacity of 100 messages.

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fetch")
    .setDescription("Testing feature to figure out how #fetch works")
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("Adding options")
        .setRequired(true)
        .addChoices(
          { name: "Option1", value: "Value1" },
          { name: "Option2", value: "Value2" },
          { name: "Option3", value: "Value3" }
        )
    ),
  async execute(interaction) {
    const date = Date.now();

    interaction.channel.messages
      .fetch({
        limit: 5,
        // around: date, // The date time you want it from. can also use on, before or after:
      })
      .then((messages) => {
        filteredMessages = messages.filter((mess) => mess.content.length > 0);
        let counter = 1;
        console.log(`Received ${messages.size} messages`);
        console.log(`Date: ${new Date(date)}`);
        // Duration value:
        // console.log(interaction.options.getString("duration"));
        console.log(`\n`);
        filteredMessages.forEach((message) => {
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
          title: "Running fetch command - check console",
        },
      ],
    });
  },
};

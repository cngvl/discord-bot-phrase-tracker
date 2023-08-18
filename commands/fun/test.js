// TODO: Need to figure out what to do as the surprise function
// I could make a list of hard coded responses but maybe I can expand by implementing some database?
// TODO: Account for case sensitivity

const { SlashCommandBuilder } = require("discord.js");
// const messageCollector = require("./messageCollector");
// const {
//   MessageMentions: { USERS_PATTERN },
// } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Scrap tester file to test for surprise feature")
    // Selecting for phrase
    .addStringOption((option) =>
      option
        .setName("phrase")
        .setRequired(true)
        .setDescription("What phrase do you want to look for")
    )
    // Selecting for user
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("Use @ to mention the user you'd like to select for")
    ),
  async execute(interaction) {
    function stopCondition(message) {
      return (
        message.content.includes("stop!") &&
        message.author.id == interaction.user.id
      );
    }
    // Sorting out target user type shit
    const mentionedTargetRaw = interaction.options.getString("user");
    // Should make a 'That user doesn't exist' kinda thing to break when a username isn't declared properly
    function getUserFromMention(mention) {
      if (!mention) {
        console.log(chalk.red.bold("NO user has been targeted - NULL"));
        return null;
      } else if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);
        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }
        // console.log(chalk.green.bold(`${mention}`));
        return mention;
      } else {
        console.log(chalk.red.bold("User has mention has FAILED"));
        return false;
      }
    }
    const mentionedUserParsed = getUserFromMention(mentionedTargetRaw);

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    randomIntValue = getRandomIntInclusive(1, 2);

    console.log(`Random number: ${randomIntValue}`);
    console.log(`Phrase: ${interaction.options.getString("phrase")}`);

    var NumberPhraseMentions = 0;
    const mentionedPhrase = interaction.options.getString("phrase");

    console.log(chalk.bgRedBright("End of execute"));

    await interaction.reply({
      embeds: [
        {
          title: `${interaction.user.username} has set up a surprise!`,
        },
      ],
    });

    // Sorting out phrase type shit
    const collector = interaction.channel.createMessageCollector();

    function checkTargetUserMentionPhrase(message, user, phrase) {
      // console.log(`message.author.id: ${message.author.id}`);
      // console.log(`user: ${user}`);
      // console.log(`message.author.id == user: ${message.author.id == user}`);
      // console.log(`message.content.include(phrase): ${message.content.includes(phrase)}`);
      if (message.author.id == user && message.content.includes(phrase)) {
        console.log(`Passes targetUserMentionPhrase`);
        return true;
      }
    }

    collector.on("collect", (m) => {
      console.log(m.content);
      if (stopCondition(m)) {
        collector.stop();
      } else if (
        checkTargetUserMentionPhrase(m, mentionedUserParsed, mentionedPhrase)
      ) {
        NumberPhraseMentions += 1;
        console.log(`Phrase mention count: ${NumberPhraseMentions}`);
      }

      if (NumberPhraseMentions == randomIntValue) {
        console.log(`Trigger surprise`);
      }
    });

    collector.on("end", (collected) => {
      console.log(
        chalk.bgGreenBright(
          `****** Collected ${collected.size} messages ******\n`
        )
      );

      interaction.channel.send({
        embeds: [
          {
            title: "End of collecting messages",
          },
        ],
      });
    });
  },
};

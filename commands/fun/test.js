// TODO: Need to figure out what to do as the surprise function
// I could make a list of hard coded responses but maybe I can expand by implementing some database?
// TODO: Account for case sensitivity
// For the event, I can just ping the target user OR if there is no target user I can just fetch the last few messages and ping whoever with some generic message.

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
        message.content.toLowerCase().includes("stop!") &&
        message.author.id == interaction.user.id
      );
    }
    // Sorting out target user type shit
    const mentionedTargetRaw = interaction.options.getString("user");
    // Might be able to remove
    var userMentioned = false;
    // Should make a 'That user doesn't exist' kinda thing to break when a username isn't declared properly
    // Potential for this to break when the user would manually input "<@ x>" - This sounds a bit silly but need to consider for safety?
    function getUserFromMention(mention) {
      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);
        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }
        userMentioned = true;
        return mention;
      } else {
        console.log(chalk.red.bold("User has mention has FAILED"));
        return false;
      }
    }

    var mentionedUserParsed = null;

    if (mentionedTargetRaw == null) {
      console.log(chalk.red.bold("NO user has been targeted - NULL"));
    } else {
      mentionedUserParsed = getUserFromMention(mentionedTargetRaw);
    }

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    const randomIntValue = getRandomIntInclusive(3, 4);

    console.log(`Random number: ${randomIntValue}`);
    console.log(`Phrase: ${interaction.options.getString("phrase")}`);

    var numberPhraseMentions = 0;
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
    function checkTargetUserMentionPhrase(message, user, phrase) {
      // console.log(`message.author.id: ${message.author.id}`);
      // console.log(`user: ${user}`);
      // console.log(`message.author.id == user: ${message.author.id == user}`);
      // console.log(`message.content.include(phrase): ${message.content.includes(phrase)}`);
      if (
        message.author.id == user &&
        message.content.toLowerCase().includes(phrase)
      ) {
        console.log(`Passes targetUserMentionPhrase`);
        return true;
      }
    }

    const collector = interaction.channel.createMessageCollector();

    function surpriseEventForNoTarget(interaction) {
      console.log("Running surpriseEventForNoTarget method");
      var uniqueUsers = [];
      interaction.channel.messages
        .fetch({
          limit: 5,
        })
        .then((messages) => {
          messages.forEach((message) => {
            if (
              !uniqueUsers.includes(message.author.id) &&
              !message.author.bot
            ) {
              uniqueUsers.push(message.author.id);
            }
          });
          const randomUserID =
            uniqueUsers[Math.floor(Math.random() * uniqueUsers.length)];
          // console.log(`Unique user IDs: ${uniqueUsers}`);
          // console.log(`Random user ID: ${randomUserID}`);
          interaction.channel.send(`<@${randomUserID}> eats ass`);
        })
        .catch(console.error);
    }

    function surpriseEventForTarget(interaction, target) {
      console.log("Running surpriseEventForTarget method");
      interaction.channel.send(`<@${target}> eats ass`);
    }

    collector.on("collect", (m) => {
      if (numberPhraseMentions == randomIntValue && !userMentioned) {
        // console.log(`Trigger surprise event`);
        surpriseEventForNoTarget(interaction);
      } else if (numberPhraseMentions == randomIntValue && userMentioned) {
        surpriseEventForTarget(interaction, mentionedUserParsed);
      }

      console.log(m.content);

      if (stopCondition(m)) {
        collector.stop();
      } else if (
        checkTargetUserMentionPhrase(m, mentionedUserParsed, mentionedPhrase)
      ) {
        numberPhraseMentions += 1;
        console.log(chalk.bgGreenBright(`MENTIONED USER`));
        console.log(`Phrase mention count: ${numberPhraseMentions}`);
      } else if (
        mentionedUserParsed == null &&
        m.content.toLowerCase().includes(mentionedPhrase)
      ) {
        numberPhraseMentions += 1;
        console.log(chalk.bgRedBright(`MENTION NULL`));
        console.log(`Phrase mention count: ${numberPhraseMentions}`);
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
            title: "End of test function",
          },
        ],
      });
    });
  },
};

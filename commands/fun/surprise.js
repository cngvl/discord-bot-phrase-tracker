// I could make a list of hard coded responses but maybe I can expand by implementing some database?

const { SlashCommandBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("surprise")
    .setDescription("Set a suprise")
    .addStringOption((option) =>
      option
        .setName("phrase")
        .setRequired(true)
        .setDescription("What phrase do you want to look for")
    )
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("Use @ to mention the user you'd like to select for")
    ),
  async execute(interaction) {
    const mentionedTargetRaw = interaction.options.getString("user");

    console.log(`Author: ${interaction.user.username}`);
    console.log(`Target user: ${mentionedTargetRaw}`);
    const mentionedPhrase = interaction.options.getString("phrase");
    console.log(`mentionedPhrase: ${mentionedPhrase}`);
    var mentionedUserParsed = null;
    var userMentioned = false;
    var numberPhraseMentions = 0;

    function stopCondition(message) {
      return (
        message.content == "stop!" && message.author.id == interaction.user.id
      );
    }

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }
    const randomIntValue = getRandomIntInclusive(5, 10);
    // console.log(`Random number: ${randomIntValue}`);

    function getUserFromMention(mention) {
      // Potential for this to break when the user would manually input "<@ x>" - This sounds a bit silly but need to consider for safety?
      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);
        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }
        userMentioned = true;
        return mention;
      } else {
        interaction.channel.send({
          embeds: [
            {
              title: "That user doesn't exist ya gronk",
            },
          ],
        });
        throw new Erorr("That user does not exist - breaking out of code");
      }
    }

    function checkTargetUserMentionPhrase(message, user, phrase) {
      return message.author.id == user && isExactMatch(message.content, phrase);
    }

    function isExactMatch(mainString, targetString) {
      const words = mainString.split(" ");
      return words.includes(targetString);
    }

    function surpriseEventForNoTarget(interaction) {
      console.log("Running surpriseEventForNoTarget method");
      var uniqueUsers = [];
      interaction.channel.messages
        .fetch({
          limit: 50,
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
          interaction.channel.send(`<@${randomUserID}> eats ass`);
        })
        .catch(console.error);
    }

    function surpriseEventForTarget(interaction, target) {
      interaction.channel.send(`<@${target}> eats ass`);
    }

    if (mentionedTargetRaw == null) {
      console.log(chalk.red.bold("NO user has been targeted - NULL"));
    } else {
      mentionedUserParsed = getUserFromMention(mentionedTargetRaw);
    }

    await interaction.reply({
      embeds: [
        {
          title: `${interaction.user.username} has set up a surprise!`,
        },
      ],
    });

    const collector = interaction.channel.createMessageCollector();

    collector.on("collect", (m) => {
      // console.log(m.content);
      if (numberPhraseMentions == randomIntValue && !userMentioned) {
        surpriseEventForNoTarget(interaction);
        collector.stop();
      } else if (numberPhraseMentions == randomIntValue && userMentioned) {
        surpriseEventForTarget(interaction, mentionedUserParsed);
        collector.stop();
      }

      if (stopCondition(m)) {
        collector.stop();
      } else if (
        checkTargetUserMentionPhrase(m, mentionedUserParsed, mentionedPhrase)
      ) {
        numberPhraseMentions += 1;
        console.log(`Phrase mention count: ${numberPhraseMentions}`);
      } else if (
        mentionedUserParsed == null &&
        m.content.toLowerCase().includes(mentionedPhrase)
      ) {
        numberPhraseMentions += 1;
        console.log(`Phrase mention count: ${numberPhraseMentions}`);
      }
    });

    collector.on("end", (collected) => {
      console.log(
        chalk.bgGreenBright(
          `****** Collected ${collected.size} messages ******\n`
        )
      );
    });
  },
};

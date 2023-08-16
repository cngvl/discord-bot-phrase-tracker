const { SlashCommandBuilder } = require("discord.js");
// const messageCollector = require("./messageCollector");
const {
  MessageMentions: { USERS_PATTERN },
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Scrap tester file to test for surprise feature")
    // Selecting for user
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("Use @ to mention the user you'd like to select for")
    )
    // Selecting number of times
    .addStringOption((option) =>
      option
        .setName("value")
        .setDescription("Number of times phrase needs to be said")
        .addChoices(
          { name: "5", value: "5" },
          { name: "10", value: "10" },
          { name: "20", value: "20" },
          { name: "Random", value: "randomValue" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("phrase")
        .setRequired(true)
        .setDescription("What phrase do you want to look for")
    ),
  // Need to add another string option for phrase
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        {
          title: "Running test command - check console ( collecting messages )",
        },
      ],
    });

    function stopCondition(message) {
      return message.content.includes("stop!");
    }

    // Sorting out target user type shit
    const userTarget = interaction.options.getString("user");

    function getUserFromMention(mention) {
      if (!mention) {
        console.log("NO user has been targeted - NULL");
        return false;
      } else if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);

        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }

        console.log("User has mention SUCCESSFULLY");
        return mention;
      } else {
        console.log("User has mention has FAILED");
        return false;
      }
    }

    getUserFromMention(userTarget);

    // Sorting out value type shit
    function targetIntValue(value) {
      return 10;
    }

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    randomIntValue = getRandomIntInclusive(1, 10);

    console.log(`Random number: ${randomIntValue}`);

    // can do some NaN shit with if value is NaN and then pull getRandomIntInclusive

    // if (!targetUser || !targetString || isNaN(targetDate)) {
    //   return message.reply('Please provide a valid user, string, and date.');
    // }

    // Sorting out phrase type shit

    // const collectorFilter = (m) => m.content.includes("string");
    const collector = interaction.channel.createMessageCollector({
      //   filter: collectorFilter,
      // time: 1000 * 5,
    });

    collector.on("collect", (m) => {
      console.log(m.content);
      if (stopCondition(m)) {
        collector.stop();
      }
    });

    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} messages`);

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

// messageCollector.on('collect', (collectedMessage) => {
//   // Check if the desired condition is met
//   if (conditionIsMet(collectedMessage)) {
//     messageCollector.emit('end', messageCollector.collected, 'conditionMet');
//   }
// });

// messageCollector.on('end', (collected, reason) => {
//   if (reason === 'conditionMet') {
//     message.reply('Collection stopped because condition was met.');
//   } else {
//     if (collected.size === 0) {
//       message.reply(`No messages found.`);
//     } else {
//       message.reply(`User ${targetUser.tag} sent ${collected.size} messages containing '${targetString}' on ${targetDate.toDateString()}.`);
//     }
//   }
// });
// }
// });

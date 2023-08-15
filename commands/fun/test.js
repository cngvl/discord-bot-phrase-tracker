const { SlashCommandBuilder } = require("discord.js");
const messageCollector = require("./messageCollector");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Scrap tester file to test for particular methods")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("Use @ to mention the user you'd like to select for")
    ),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        {
          title: "Running test command - check console ( collecting messages )",
        },
      ],
    });

    function conditionIsMet(message) {
      return message.content.includes("stop");
    }

    console.log(interaction.options.getString("user"));

    // if (!targetUser || !targetString || isNaN(targetDate)) {
    //   return message.reply('Please provide a valid user, string, and date.');
    // }

    // const collectorFilter = (m) => m.content.includes("string");
    const collector = interaction.channel.createMessageCollector({
      //   filter: collectorFilter,
      // time: 1000 * 5,
    });

    collector.on("collect", (m) => {
      console.log(m.content);
      if (conditionIsMet(m)) {
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

// function conditionIsMet(message) {
// // Implement your own condition check logic here
// // Return true if the condition is met, false otherwise
// return message.content.includes('stop-collection');
// }

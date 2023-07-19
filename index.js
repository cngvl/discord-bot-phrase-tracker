// Require the necessary discord.js classes
const fs = require("node:fs"); // Node's native file system module. Used to read commands directory and identify command files
const path = require("node:path"); // Node's native path utility module. Helps constructs paths to access files and directories

const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
// GateIntentBits.guilds iintent option is necessary for the discord.js client to work - what does it enable in particular?
// TODO: Look into Gateway Intents document page
// Collection sxtends JS's native Map class. Used to store and retrieve commands

const { token } = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// This block is placed in /events/ready.js
// client.once(Events.ClientReady, c => {
// 	console.log(`Ready! Logged in as ${c.user.tag}`);
// });

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath); // Constructing path to commands folder, looking at the groups of commands ( fun, utility, etc. )

// Retrieving all command files
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath) // Constructing path to commands folder
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Retrieving all command files
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Testing section
// if (command === "test") {
//   let filter = (m) => m.content.toLowerCase() === "poo";
//   const collector = message.channel.createMessageCollector(filter, {
//     max: 10,
//     time: 10000,
//   });

//   collector.on("collect", (m) => {
//     // console.log(m.content);
//     console.log("collect");
//   });

//   collector.on("end", (m) => {
//     console.log("end");
//   });
// }

// Log in to Discord with your client's token
client.login(token);

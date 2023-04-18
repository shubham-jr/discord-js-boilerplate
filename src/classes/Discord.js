const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const config = require("./../utils/config");
const fs = require("fs");
const path = require("path");

class Discord extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
      ],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    });
  }

  clientLogin() {
    this.login(config.discordBotToken);
  }

  loadCommands() {
    this.commands = new Collection();
    const commandFiles = fs
      .readdirSync(path.join(__dirname, "./../commands"))
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./../commands/${file}`);
      this.commands.set(command.name, command);
    }
  }

  loadEvents() {
    const eventFiles = fs
      .readdirSync(path.join(__dirname, "./../events"))
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const event = require(`./../events/${file}`);
      console.log(event);
      if (event.once) {
        this.once(event.name, (...args) => event.execute(...args, this));
      } else {
        this.on(event.name, (...args) => event.execute(...args, this));
      }
    }
  }
}

module.exports = Discord;

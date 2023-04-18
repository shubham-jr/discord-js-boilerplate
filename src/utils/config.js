require("dotenv").config({ path: __dirname + "/../.env" });

module.exports = {
  env: process.env.NODE_ENV || "production",
  port: process.env.PORT,
  // mongourl: process.env.MONGODB_URL,
  discordBotToken: process.env.DISCORD_BOT_TOKEN,
  prefix: process.env.PREFIX,
};

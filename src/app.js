const express = require("express");
const pinoHttp = require("pino-http");
const Discord = require("./classes/Discord");

const logger = require("./utils/logger");
const { errorConverter, errorHandler } = require("./middlewares/error");

const app = express();

const discord = new Discord();

discord.loadCommands();
discord.loadEvents();
discord.clientLogin();

app.use(
  pinoHttp({
    logger: logger,
  })
);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;

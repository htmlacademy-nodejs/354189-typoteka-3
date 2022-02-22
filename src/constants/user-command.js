"use strict";

const UserCommand = {
  HELP: `--help`,
  GENERATE: `--generate`,
  FILL: `--fill`,
  VERSION: `--version`,
  SERVER: `--server`,
};

const DEFAULT_COMMAND = UserCommand.HELP;

module.exports = {
  UserCommand,
  DEFAULT_COMMAND,
};

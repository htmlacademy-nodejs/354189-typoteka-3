"use strict";

const UserCommand = {
  HELP: `--help`,
  GENERATE: `--generate`,
  VERSION: `--version`,
};

const DEFAULT_COMMAND = UserCommand.HELP;

module.exports = {
  UserCommand,
  DEFAULT_COMMAND,
};

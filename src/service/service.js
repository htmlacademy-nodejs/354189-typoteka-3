"use strict";

const {Cli} = require(`./cli`);
const {DEFAULT_COMMAND} = require(`../constants/user-command`);
const {ExitCode, USER_ARGV_INDEX} = require(`../constants/app`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;
const currentUserCommand = Cli[userCommand];

if (userArguments.length === 0 || !currentUserCommand) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.SUCCESS);
}

Cli[userCommand].run(userArguments.slice(1));

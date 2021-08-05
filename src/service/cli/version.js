"use strict";

const packageJsonFile = require(`../../../package.json`);
const {UserCommand} = require(`../../constants/user-command`);

module.exports = {
  name: UserCommand.VERSION,
  run() {
    const version = packageJsonFile.version;
    console.info(version);
  },
};

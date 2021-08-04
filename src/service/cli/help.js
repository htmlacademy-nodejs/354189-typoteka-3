"use strict";

const {UserCommand} = require(`../../constants/user-command`);

const HELP_INFO = `
  Программа запускает http-сервер и формирует файл с данными для API.

  Гайд:
    service.js <command>
  Команды:
    --version: выводит номер версии
    --help: печатает этот текст
    --generate <count> формирует файл mocks.json
`;

module.exports = {
  name: UserCommand.HELP,
  run() {
    console.info(HELP_INFO);
  },
};

"use strict";

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;

const {UserCommand} = require(`../../constants/user-command`);
const {HttpCode} = require(`../../constants/app`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.writeHead(statusCode, {
    "Content-Type": `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const routeHandler = {
  "/": async (_, res) => {
    try {
      const fileContent = await fs.readFile(FILENAME);
      const mocks = JSON.parse(fileContent);
      const listItems = mocks.map((post) => `<li>${post.title}</li>`).join(``);
      sendResponse(res, HttpCode.OK, `<ul>${listItems}</ul>`);
    } catch (err) {
      throw new Error(`Error with read file`);
    }
  },
};

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  const handler = routeHandler[req.url];
  if (!handler) {
    sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
    return;
  }

  try {
    await handler(req, res);
  } catch (err) {
    sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
  }
};

module.exports = {
  name: UserCommand.SERVER,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http
      .createServer(onClientConnect)
      .listen(port)
      .on(`listening`, () => {
        console.info(chalk.green(`Ожидаю соединений на ${port}`));
      })
      .on(`error`, ({message}) => {
        console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
      });
  },
};

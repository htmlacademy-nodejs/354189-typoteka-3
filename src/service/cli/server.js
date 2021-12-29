"use strict";

const express = require(`express`);
const chalk = require(`chalk`);

const {UserCommand} = require(`../../constants/user-command`);
const {API_PREFIX} = require(`../../constants/app`);
const api = require(`../api`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.urlencoded({extended: false}));

Object.entries(api).forEach(([route, router]) =>
  app.use(`${API_PREFIX}${route}`, router)
);

app.use((_, res) => {
  res.status(404);
  return res.send(`This route not found`);
});

module.exports = {
  name: UserCommand.SERVER,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, () =>
      console.info(chalk.green(`Ожидаю соединений на ${port}`))
    );
  },
};

"use strict";

const express = require(`express`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {UserCommand} = require(`../../constants/user-command`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const app = express();
const postsRouter = new express.Router();

app.use(express.urlencoded({extended: false}));

postsRouter.get(`/`, async (_, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.send(mocks);
  } catch (err) {
    res.send([]);
  }
});

app.use(`/posts`, postsRouter);

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

"use strict";

const express = require(`express`);
const chalk = require(`chalk`);

const {UserCommand} = require(`../../constants/user-command`);
const {API_PREFIX} = require(`../../constants/app`);

const {createAppRouter} = require(`../api`);
const {getMockData} = require(`../db/helpers`);
const {createDataBase} = require(`../db/db`);

const {DaoArticles, DaoComments, DaoCategories} = require(`../dao`);
const {
  ArticlesCommentsService,
  ArticlesService,
  CategoriesService,
  SearchService,
} = require(`../services`);

const DEFAULT_PORT = 3000;
const app = express();
app.use(express.urlencoded({extended: false}));

const runServer = async (port) => {
  let initialData = null;
  try {
    initialData = await getMockData();
  } catch (err) {
    throw new Error(`Ошибка при инициализации базы данных:`, err);
  }

  const db = createDataBase(initialData);
  const daoArticles = new DaoArticles(db);
  const daoCategories = new DaoCategories(db);
  const daoComments = new DaoComments(db);


  const appRouter = createAppRouter({
    articleCommentsService: new ArticlesCommentsService(daoComments),
    articlesService: new ArticlesService(daoArticles),
    categoriesService: new CategoriesService(daoCategories),
    searchService: new SearchService(daoArticles),
  });
  app.use(API_PREFIX, appRouter);

  app.use((_, res) => {
    res.status(404);
    return res.send(`This route not found`);
  });

  app.listen(port, () => {
    console.info(chalk.green(`Ожидаю соединений на ${port}`));
  });
};

module.exports = {
  name: UserCommand.SERVER,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    runServer(port);
  },
};

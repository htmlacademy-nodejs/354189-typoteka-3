"use strict";

const express = require(`express`);

const {UserCommand} = require(`../../constants/user-command`);
const {API_PREFIX, HttpCode} = require(`../../constants/app`);
const {getLogger} = require(`../lib/logger`);

const {createAppRouter} = require(`../api`);
const {getMockData} = require(`../db/helpers`);
const {createDataBase} = require(`../db/db`);

const {DaoArticles, DaoComments, DaoCategories} = require(`../dao`);
const {
  ArticlesCommentsService,
  ArticlesService,
  CategoriesService,
  SearchService,
} = require(`../api-services`);

const DEFAULT_PORT = 3000;
const logger = getLogger();
const app = express();
app.use(express.urlencoded({extended: false}));

const runServer = async (port) => {
  let initialData = null;
  try {
    initialData = await getMockData();
  } catch (err) {
    return logger.error(`Error on db initiallize:`, err);
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

  app.use((req, res, next) => {
    logger.debug(`Request: ${req.method.toUpperCase()}: ${req.url}`);
    res.on(`finish`, () => {
      logger.info(`Response status code ${res.statusCode}`);
    });
    next();
  });

  app.use(API_PREFIX, appRouter);

  app.use((req, res) => {
    logger.error(`Route not found: ${req.url}`);
    res.status(HttpCode.NOT_FOUND);
    return res.send(`This route not found`);
  });

  app.use((err, _req, _res, _next) => {
    logger.error(`Error on processing request: ${err.message}`);
  });

  app.listen(port, (err) => {
    if (err) {
      return logger.error(`Error on server creation: ${err.message}`);
    }

    return logger.info(`Listening to connections on ${port}`);
  });

  return true;
};

module.exports = {
  name: UserCommand.SERVER,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    runServer(port);
  },
};

"use strict";
const {Router} = require(`express`);
const Articles = require(`../services/Articles`);
const articlesCommentsRouter = require(`./articlesComments`);
const articlesRouter = new Router();

articlesRouter.use(`/:articleId/comments`, articlesCommentsRouter);

articlesRouter.get(`/`, async (req, res) => {
  console.log(`/api/articles`);
  try {
    const articles = await Articles.getAll();
    res.send(articles);
  } catch (e) {
    res.status(422);
    res.send(`Error: ${e}`);
  }
});

articlesRouter.get(`/:articleId`, async (req, res) => {
  console.log(`/api/articles/:articleId`);
  const {articleId} = req.params;
  try {
    const article = await Articles.getById(articleId);
    res.send(article);
  } catch (e) {
    res.status(422);
    res.send(`Error: ${e}`);
  }
});

articlesRouter.post(`/`, async (req, res) => {
  console.log(`/api/articles`);
  try {
    const article = await Articles.addOne({title: `kek`});
    res.send(article);
  } catch (e) {
    res.status(422);
    res.send(`Error: ${e}`);
  }
});

articlesRouter.put(`/:articleId`, async (req, res) => {
  console.log(`/api/articles/:articleId`);
  const {articleId} = req.params;
  try {
    const article = await Articles.updateById(articleId, {title: `kek`});
    res.send(article);
  } catch (e) {
    res.status(422);
    res.send(`Error: ${e}`);
  }
});

articlesRouter.delete(`/:articleId`, async (req, res) => {
  console.log(`/api/articles/:articleId`);
  const {articleId} = req.params;
  try {
    const articles = await Articles.removeById(articleId);
    res.send(articles);
  } catch (e) {
    res.status(422);
    res.send(`Error: ${e}`);
  }
});

module.exports = articlesRouter;

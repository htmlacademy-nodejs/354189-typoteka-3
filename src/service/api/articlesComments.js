"use strict";
const {Router} = require(`express`);
const ArticlesComments = require(`../services/ArticlesComments`);
const articlesCommentsRouter = new Router({mergeParams: true});

articlesCommentsRouter.get(`/`, async (req, res) => {
  console.log(`/api/articles/:articleId/comments`);
  const {articleId} = req.params;
  try {
    const comments = await ArticlesComments.getAll(articleId);
    res.send(comments);
  } catch (e) {
    res.status(422);
    res.send(`Error: ${e}`);
  }
});

articlesCommentsRouter.delete(`/:commentId`, async (req, res) => {
  console.log(`/api/articles/:articleId/comments/:commentId`);
  const {articleId, commentId} = req.params;
  try {
    const article = await ArticlesComments.removeById(articleId, commentId);
    res.send(article.comments);
  } catch (e) {
    res.status(422);
    res.send(`Error: ${e}`);
  }
});

articlesCommentsRouter.post(`/`, async (req, res) => {
  res.send(`/api/articles/${req.params.articleId}/comments`);
  const {articleId} = req.params;
  try {
    const article = await ArticlesComments.addOne(articleId, `texttexttext`);
    res.send(article.comments);
  } catch (e) {
    res.status(422);
    res.send(`Error: ${e}`);
  }
});

module.exports = articlesCommentsRouter;

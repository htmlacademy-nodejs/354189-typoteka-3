"use strict";
const {Router} = require(`express`);
const myRouter = new Router();
const api = require(`../api`);

myRouter.get(`/`, async (req, res) => {
  const {data: articles} = await api.articles.getAll();
  return res.render(`my`, {headerType: `admin`, articles});
});

myRouter.get(`/comments`, async (req, res) => {
  const {data: articles} = await api.articles.getAll();
  const comments = articles.flatMap((a) => a.comments);
  return res.render(`comments`, {headerType: `admin`, comments});
});

module.exports = myRouter;

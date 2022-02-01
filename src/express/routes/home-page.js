"use strict";

const {Router} = require(`express`);
const homePageRouter = new Router();
const api = require(`../api`);

homePageRouter.get(`/`, async (req, res) => {
  const {data: articles} = await api.articles.getAll();
  return res.render(`main`, {headerType: `auth`, articles});
});

module.exports = homePageRouter;

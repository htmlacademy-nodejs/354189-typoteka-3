"use strict";
const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/:id`, (req, res) =>
  res.render(`post-detail`, {headerType: `admin`})
);

articlesRouter.get(`/add`, (req, res) =>
  res.render(`new-post`, {headerType: `auth`})
);

articlesRouter.get(`/category/:id`, (req, res) =>
  res.render(`aticles-by-category`, {headerType: `auth`})
);

articlesRouter.get(`/edit/:id`, (req, res) =>
  res.send(`/articles/edit/${req.params.id}`)
);

module.exports = articlesRouter;

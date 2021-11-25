"use strict";
const {Router} = require(`express`);
const categoriesRouter = new Router();

categoriesRouter.get(`/`, (req, res) =>
  res.render(`all-categories`, {headerType: `auth`, isColoredBackground: true})
);

module.exports = categoriesRouter;

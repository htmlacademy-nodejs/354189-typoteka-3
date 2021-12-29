"use strict";

const articlesRouter = require(`./articles`);
const categoriesRouter = require(`./categories`);
const searchRouter = require(`./search`);

module.exports = {
  "/articles": articlesRouter,
  "/categories": categoriesRouter,
  "/search": searchRouter,
};

"use strict";

const {createArticlesRouter} = require(`./articles`);
const {createCategoriesRouter} = require(`./categories`);
const {createSearchRouter} = require(`./search`);
const {createArticlesCommensRouter} = require(`./articlesComments`);
const {Router} = require(`express`);

const createAppRouter = ({
  articleCommentsService,
  articlesService,
  categoriesService,
  searchService,
}) => {
  const router = new Router();

  createSearchRouter({parent: router, searchService});
  createCategoriesRouter({parent: router, categoriesService});
  createArticlesRouter({parent: router, articlesService});
  createArticlesCommensRouter({parent: router, articleCommentsService});

  return router;
};

module.exports = {createAppRouter};

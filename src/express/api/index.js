"use strict";

const {requestService} = require(`./requestService`);
const {createArticlesApi} = require(`./articles`);
const {createArticlesCommentsApi} = require(`./articlesComments`);
const {createCategoriesApi} = require(`./categories`);
const {createSearchApi} = require(`./search`);

const api = {
  articles: createArticlesApi(requestService),
  articlesComments: createArticlesCommentsApi(requestService),
  categories: createCategoriesApi(requestService),
  search: createSearchApi(requestService),
};

module.exports = api;

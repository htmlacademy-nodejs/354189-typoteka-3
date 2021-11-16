"use strict";

const homePageRouter = require(`./home-page`);
const articlesRouter = require(`./articles`);
const categoriesRouter = require(`./categories`);
const loginRouter = require(`./login`);
const myRouter = require(`./my`);
const registerRouter = require(`./register`);
const searchRouter = require(`./search`);

module.exports = {
  "/": homePageRouter,
  "/acrticles": articlesRouter,
  "/categories": categoriesRouter,
  "/login": loginRouter,
  "/my": myRouter,
  "/register": registerRouter,
  "/search": searchRouter,
};

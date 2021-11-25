"use strict";

const {Router} = require(`express`);
const homePageRouter = new Router();

homePageRouter.get(`/`, (req, res) =>
  res.render(`main`, {headerType: `auth`, isColoredBackground: true})
);

module.exports = homePageRouter;

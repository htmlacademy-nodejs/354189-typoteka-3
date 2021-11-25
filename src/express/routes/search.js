"use strict";
const {Router} = require(`express`);
const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => res.render(`search`, {headerType: `auth`, isColoredBackground: true}));

module.exports = searchRouter;

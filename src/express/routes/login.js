"use strict";
const {Router} = require(`express`);
const loginRouter = new Router();

loginRouter.get(`/`, (req, res) => res.render(`login`, {headerType: `auth`, isColoredBackground: true}));

module.exports = loginRouter;

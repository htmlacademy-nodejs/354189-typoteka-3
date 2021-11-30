"use strict";
const {Router} = require(`express`);
const loginRouter = new Router();

loginRouter.get(`/`, (req, res) => res.render(`login`, {headerType: `auth`}));

module.exports = loginRouter;

"use strict";
const {Router} = require(`express`);
const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => res.render(`admin`, {headerType: `admin`}));

module.exports = searchRouter;

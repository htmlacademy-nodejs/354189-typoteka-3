"use strict";

const {Router} = require(`express`);
const homePageRouter = new Router();

homePageRouter.get(`/`, (req, res) => res.send(`/`));

module.exports = homePageRouter;

"use strict";
const {Router} = require(`express`);
const registerRouter = new Router();

registerRouter.get(`/`, (req, res) => res.render(`sign-up`, {headerType: `auth`, isColoredBackground: true}));

module.exports = registerRouter;

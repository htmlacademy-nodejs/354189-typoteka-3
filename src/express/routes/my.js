"use strict";
const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`my`, {headerType: `auth`, isColoredBackground: true}));

myRouter.get(`/comments`, (req, res) => res.render(`comments`, {headerType: `auth`, isColoredBackground: true}));

module.exports = myRouter;

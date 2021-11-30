"use strict";
const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`my`, {headerType: `admin`}));

myRouter.get(`/comments`, (req, res) => res.render(`comments`, {headerType: `admin`}));

module.exports = myRouter;

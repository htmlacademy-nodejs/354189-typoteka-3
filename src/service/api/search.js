"use strict";
const {Router} = require(`express`);
const Search = require(`../services/Search`);
const searchRouter = new Router();

searchRouter.get(`/`, async (req, res) => {
  console.log(`/api/search?query=`);
  try {
    const articles = await Search.search(`asd asd asd`);
    res.send(articles);
  } catch (e) {
    res.status(422);
    res.send(`Error: ${e}`);
  }
});

module.exports = searchRouter;

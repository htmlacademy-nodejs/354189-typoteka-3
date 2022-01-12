"use strict";
const {Router} = require(`express`);
const {HttpCode} = require(`../../constants/app`);

const createSearchRouter = ({parent, searchService}) => {
  const router = new Router();
  parent.use(`/search`, router);

  router.get(`/`, async (req, res) => {
    const {query} = req.query;

    if (!query) {
      res.status(HttpCode.BAD_REQUEST).json([]);
      return;
    }

    try {
      const articles = await searchService.search(query);
      res.send(articles);
    } catch (e) {
      res.status(422);
      res.send(`Error: ${e}`);
    }
  });
};

module.exports = {createSearchRouter};

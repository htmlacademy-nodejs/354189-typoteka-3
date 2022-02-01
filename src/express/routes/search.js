"use strict";
const {Router} = require(`express`);
const searchRouter = new Router();
const api = require(`../api`);

searchRouter.get(`/`, async (req, res) => {
  const {search} = req.query;
  if (!search) {
    res.render(`search`, {headerType: `admin`});
  } else {
    try {
      const {data: articles} = await api.search.find({query: search});
      res.render(`search`, {
        headerType: `admin`,
        results: articles,
      });
    } catch (e) {
      res.render(`search`, {
        headerType: `admin`,
        initialFormValue: {search},
      });
    }
  }
});

module.exports = searchRouter;

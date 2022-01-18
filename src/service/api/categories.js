"use strict";
const {Router} = require(`express`);

const createCategoriesRouter = ({parent, categoriesService}) => {
  const router = new Router();
  parent.use(`/categories`, router);

  router.get(`/`, async (req, res) => {
    try {
      const categories = await categoriesService.getAll();
      res.send(categories);
    } catch (e) {
      res.status(422);
      res.send(`Error: ${e}`);
    }
  });
};


module.exports = {createCategoriesRouter};

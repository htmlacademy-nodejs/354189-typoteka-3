"use strict";
const {Router} = require(`express`);
const Categories = require(`../services/Categories`);
const categoriesRouter = new Router();

categoriesRouter.get(`/`, async (req, res) => {
  console.log(`/api/categories`);
  try {
    const categories = await Categories.getAll();
    res.send(categories);
  } catch (e) {
    res.status(422);
    res.send(`Error: ${e}`);
  }
});

module.exports = categoriesRouter;

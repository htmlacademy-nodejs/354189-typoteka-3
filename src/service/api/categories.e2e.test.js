"use strict";
const express = require(`express`);
const request = require(`supertest`);

const {createDataBase} = require(`../db/db`);
const {DaoCategories} = require(`../dao`);
const {CategoriesService} = require(`../api-services`);
const {HttpCode} = require(`../../constants/app`);
const {createCategoriesRouter} = require(`./categories`);
const {mockData} = require(`../test-mock/articles`);

describe(`Categories Api`, () => {
  let app;
  let db;

  const createApi = (state = mockData) => {
    app = express();
    app.use(express.json());
    db = createDataBase(state);
    createCategoriesRouter({
      parent: app,
      categoriesService: new CategoriesService(new DaoCategories(db)),
    });
  };

  beforeEach(() => {
    createApi();
  });

  const getAll = async () => request(app).get(`/categories`);

  describe(`Get all`, () => {
    test(`Response status code 200`, async () => {
      const {status} = await getAll();

      expect(status).toBe(HttpCode.OK);
    });
    test(`Return all categories`, async () => {
      const {body} = await getAll();
      const cats = Array.from(
          new Set(mockData.flatMap(({category}) => category))
      );

      expect(body).toEqual(cats);
    });
  });
});

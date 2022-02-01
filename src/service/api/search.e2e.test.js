"use strict";
const express = require(`express`);
const request = require(`supertest`);

const {createDataBase} = require(`../db/db`);
const {DaoArticles} = require(`../dao`);
const {SearchService} = require(`../api-services`);
const {HttpCode} = require(`../../constants/app`);
const {createSearchRouter} = require(`./search`);
const {mockData} = require(`../test-mock/articles`);

describe(`Search Api`, () => {
  const mockArticle = mockData[0];
  let app;
  let db;

  const createApi = (state = mockData) => {
    app = express();
    app.use(express.json());
    db = createDataBase(state);
    const searchService = new SearchService(new DaoArticles(db));
    createSearchRouter({parent: app, searchService});
  };

  beforeEach(() => {
    createApi();
  });

  const search = async (query) =>
    await request(app).get(`/search`).query({query});

  describe(`search`, () => {
    test(`Response status code 200`, async () => {
      const QUERY_STRING = `Учим HTML`;

      const res = await search(QUERY_STRING);

      expect(res.status).toBe(HttpCode.OK);
    });
    test(`Found 1 item`, async () => {
      const QUERY_STRING = `Учим HTML`;

      const res = await search(QUERY_STRING);

      expect(res.body).toEqual([mockArticle]);
    });
    test(`Found 2 item`, async () => {
      const QUERY_STRING = `Учим`;

      const res = await search(QUERY_STRING);

      expect(res.body).toEqual(mockData);
    });
    test(`Found 0 items, return empty array`, async () => {
      const QUERY_STRING = `Учим 999`;

      const res = await search(QUERY_STRING);

      expect(res.body).toHaveLength(0);
    });
    test(`Return status 400 without search string`, async () => {
      const res = await search();

      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });
  });
});

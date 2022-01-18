"use strict";
const express = require(`express`);
const request = require(`supertest`);

const {HttpCode} = require(`../../constants/app`);

const {createDataBase} = require(`../db/db`);
const {DaoArticles} = require(`../dao`);
const {ArticlesService} = require(`../api-services`);
const {createArticlesRouter} = require(`./articles`);
const {mockData} = require(`../test-mock/articles`);

describe(`Articles Api`, () => {
  const FAKE_ID = `fake_id`;
  let app;
  let db;

  const createApi = (state = mockData) => {
    app = express();
    app.use(express.json());
    db = createDataBase(state);
    const articlesService = new ArticlesService(new DaoArticles(db));
    createArticlesRouter({parent: app, articlesService});
  };

  beforeEach(() => {
    createApi();
  });

  const getAll = async (id) => await request(app).get(`/articles/${id}`);
  const addOne = async (data) =>
    await request(app).post(`/articles/`).send(data);
  const updateOne = async (id, data) =>
    await request(app).put(`/articles/${id}`).send(data);
  const deleteOne = async (id) => await request(app).delete(`/articles/${id}`);

  describe(`get all articles`, () => {
    test(`Response status code 200`, async () => {
      const res = await request(app).get(`/articles`);

      expect(res.statusCode).toBe(HttpCode.OK);
    });
    test(`Return all acrticles from db`, async () => {
      const res = await request(app).get(`/articles`);

      expect(res.body).toEqual(mockData);
    });
  });

  describe(`get article by id`, () => {
    const articleId = mockData[1].id;
    test(`Response status code 200`, async () => {
      const res = await getAll(articleId);

      expect(res.statusCode).toBe(HttpCode.OK);
    });
    test(`Return article with right id`, async () => {
      const res = await getAll(articleId);

      expect(res.body.id).toBe(articleId);
    });

    test(`Return 404 error if pass wrong id`, async () => {
      const res = await getAll(FAKE_ID);

      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });
    test(`Return right error text`, async () => {
      const res = await getAll(FAKE_ID);

      expect(res.text).toBe(`Error: Нет статьи с id: ${FAKE_ID}`);
    });
  });

  describe(`add article`, () => {
    const newArticle = {
      title: `test test`,
      announce: `test test test`,
      fullText: `test test test test`,
    };
    test(`Response status after add 200`, async () => {
      const {status} = await addOne(newArticle);

      expect(status).toBe(HttpCode.OK);
    });
    test(`Response has new article`, async () => {
      const {body} = await addOne(newArticle);

      expect(body).toEqual(expect.objectContaining(newArticle));
    });
  });

  describe(`update article by id`, () => {
    const newArticleFields = {
      title: `test test`,
      fullText: `test test test test`,
    };
    const articleId = mockData[1].id;
    const oldArticle = mockData.find((el) => el.id === articleId);

    test(`Response status after add 200`, async () => {
      const {status} = await updateOne(articleId, newArticleFields);

      expect(status).toBe(HttpCode.OK);
    });
    test(`Response has new article`, async () => {
      const {body} = await updateOne(articleId, newArticleFields);

      expect(body).toEqual({...oldArticle, ...newArticleFields});
    });

    test(`Response has new article`, async () => {
      const {status} = await updateOne(FAKE_ID, newArticleFields);

      expect(status).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`Delete article by id`, () => {
    const articleId = mockData[1].id;
    test(`Response status code 200`, async () => {
      const res = await deleteOne(articleId);

      expect(res.status).toBe(HttpCode.OK);
    });
    test(`Return array without old aricle`, async () => {
      const {body: articles} = await deleteOne(articleId);

      expect(articles).toEqual(mockData.filter((el) => el.id !== articleId));
    });

    test(`Return all acrticles from db`, async () => {
      const res = await deleteOne(FAKE_ID);

      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });
  });
});

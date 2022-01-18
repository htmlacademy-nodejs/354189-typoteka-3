"use strict";
const express = require(`express`);
const request = require(`supertest`);

const {createDataBase} = require(`../db/db`);
const {DaoComments} = require(`../dao`);
const {createArticlesCommensRouter} = require(`./articlesComments`);
const {ArticlesCommentsService} = require(`../api-services`);
const {HttpCode} = require(`../../constants/app`);
const {mockData} = require(`../test-mock/articles`);

describe(`Articles Comments Api`, () => {
  const FAKE_ID = `fake-id`;
  const mockArticle = mockData[0];

  let app;
  let db;

  const createApi = (state = mockData) => {
    app = express();
    app.use(express.json());
    db = createDataBase(state);
    createArticlesCommensRouter({
      parent: app,
      articleCommentsService: new ArticlesCommentsService(new DaoComments(db)),
    });
  };

  beforeEach(() => {
    createApi();
  });

  const getAll = async (id) => await request(app).get(`/articles/${id}/comments`);
  const addOne = async ({data, articleId}) =>
    await request(app).post(`/articles/${articleId}/comments`).send(data);
  const deleteOne = async ({articleId, commentId}) =>
    await request(app).delete(`/articles/${articleId}/comments/${commentId}`);

  describe(`Get all article comments`, () => {
    const articleId = mockArticle.id;
    test(`Response status code 200`, async () => {
      const {status} = await getAll(articleId);

      expect(status).toBe(HttpCode.OK);
    });
    test(`Return all acrticles from db`, async () => {
      const {body} = await getAll(articleId);

      expect(body).toEqual(mockArticle.comments);
    });

    test(`Return erorr if wrong article id`, async () => {
      const {status} = await getAll(FAKE_ID);

      expect(status).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`Add comment`, () => {
    const NEW_COMMENT = {text: `new comment`};
    const articleId = mockArticle.id;

    test(`Response status code 200`, async () => {
      const {status} = await addOne({data: NEW_COMMENT, articleId});
      expect(status).toBe(HttpCode.OK);
    });
    test(`Return new comment`, async () => {
      const {body} = await addOne({data: NEW_COMMENT, articleId});

      expect(body).toHaveLength(mockArticle.comments.length + 1);
      expect(body[body.length - 1]).toEqual(expect.objectContaining(NEW_COMMENT));
    });
    test(`Return erorr if wrong article id`, async () => {
      const {status} = await addOne({data: NEW_COMMENT, articleId: FAKE_ID});

      expect(status).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`Delete comment`, () => {
    const articleId = mockArticle.id;
    const commentId = mockArticle.comments[0].id;

    test(`Response status code 200`, async () => {
      const {status} = await deleteOne({articleId, commentId});

      expect(status).toBe(HttpCode.OK);
    });
    test(`Return new comments array`, async () => {
      const {body} = await deleteOne({articleId, commentId});

      expect(body).toHaveLength(mockArticle.comments.length - 1);
      expect(body).toEqual(mockArticle.comments.filter((el) => el.id !== commentId));
    });
    test(`Return erorr if wrong commment id`, async () => {
      const {status} = await deleteOne({articleId, commentId: FAKE_ID});

      expect(status).toBe(HttpCode.BAD_REQUEST);
    });
    test(`Return erorr if wrong article id`, async () => {
      const {status} = await deleteOne({articleId: FAKE_ID, commentId});

      expect(status).toBe(HttpCode.BAD_REQUEST);
    });
  });

});

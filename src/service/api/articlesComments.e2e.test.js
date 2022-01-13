"use strict";
const express = require(`express`);
const request = require(`supertest`);

const {createDataBase} = require(`../db/db`);
const {DaoComments} = require(`../dao`);
const {createArticlesCommensRouter} = require(`./articlesComments`);
const {ArticlesCommentsService} = require(`../api-services`);
const {HttpCode} = require(`../../constants/app`);

const mockData = [
  {
    id: `VjVObb`,
    title: `Учим HTML и CSS`,
    announce: `Вы можете достичь всего`,
    fullText: `Помните, небольшое количество`,
    createdDate: `29-12.2021 23:39:13`,
    category: [`Без рамки`, `Музыка`],
    comments: [
      {id: `mB5hnR`, text: `Планируете записать видосик?`},
      {id: `zxczxc`, text: `Хочу такую же футболку :-) te-te-te-te-te-te`},
    ],
  },
];

describe(`Articles Comments Api`, () => {
  const ARTICLE_ID = `VjVObb`;
  const FAKE_ID = `fake-id`;

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
  const addOne = async (data, articleId = ARTICLE_ID) =>
    await request(app).post(`/articles/${articleId}/comments`).send(data);
  const deleteOne = async ({articleId, commentId}) =>
    await request(app).delete(`/articles/${articleId}/comments/${commentId}`);

  describe(`Get all article comments`, () => {
    test(`Response status code 200`, async () => {
      const {status} = await getAll(ARTICLE_ID);

      expect(status).toBe(HttpCode.OK);
    });
    test(`Return all acrticles from db`, async () => {
      const {body} = await getAll(ARTICLE_ID);

      expect(body).toEqual([
        {id: `mB5hnR`, text: `Планируете записать видосик?`},
        {id: `zxczxc`, text: `Хочу такую же футболку :-) te-te-te-te-te-te`},
      ]);
    });

    test(`Return erorr if wrong article id`, async () => {
      const {status} = await getAll(FAKE_ID);

      expect(status).toBe(HttpCode.UNPROCESSABLE_ENTITY);
    });
  });

  describe(`Add comment`, () => {
    const NEW_COMMENT = {text: `new comment`};

    test(`Response status code 200`, async () => {
      const {status} = await addOne(NEW_COMMENT);
      expect(status).toBe(HttpCode.OK);
    });
    test(`Return new comment`, async () => {
      const {body} = await addOne(NEW_COMMENT);

      expect(body).toHaveLength(mockData[0].comments.length + 1);
      expect(body[body.length - 1]).toEqual(expect.objectContaining(NEW_COMMENT));
    });
    test(`Return erorr if wrong article id`, async () => {
      const {status} = await addOne(NEW_COMMENT, FAKE_ID);

      expect(status).toBe(HttpCode.UNPROCESSABLE_ENTITY);
    });
  });

  describe(`Delete comment`, () => {
    const COMMENT_ID = `mB5hnR`;

    test(`Response status code 200`, async () => {
      const {status} = await deleteOne({articleId: ARTICLE_ID, commentId: COMMENT_ID});

      expect(status).toBe(HttpCode.OK);
    });
    test(`Return new comments array`, async () => {
      const {body} = await deleteOne({articleId: ARTICLE_ID, commentId: COMMENT_ID});

      expect(body).toHaveLength(mockData[0].comments.length - 1);
      expect(body).toEqual(mockData[0].comments.filter((el) => el.id !== COMMENT_ID));
    });
    test(`Return erorr if wrong commment id`, async () => {
      const {status} = await deleteOne({articleId: ARTICLE_ID, commentId: FAKE_ID});

      expect(status).toBe(HttpCode.UNPROCESSABLE_ENTITY);
    });
    test(`Return erorr if wrong article id`, async () => {
      const {status} = await deleteOne({articleId: FAKE_ID, commentId: COMMENT_ID});

      expect(status).toBe(HttpCode.UNPROCESSABLE_ENTITY);
    });
  });

});

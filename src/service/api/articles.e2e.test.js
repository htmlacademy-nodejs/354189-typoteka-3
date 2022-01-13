"use strict";
const express = require(`express`);
const request = require(`supertest`);

const {createDataBase} = require(`../db/db`);
const {DaoArticles} = require(`../dao`);
const {createArticlesRouter} = require(`./articles`);
const {ArticlesService} = require(`../api-services`);
const {HttpCode} = require(`../../constants/app`);

const mockData = [
  {
    id: `VjVObb`,
    title: `Учим HTML и CSS`,
    announce: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    fullText: `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    createdDate: `29-12.2021 23:39:13`,
    category: [`Без рамки`, `Музыка`, `Кино`],
    comments: [
      {
        id: `mB5hnR`,
        text: `Хочу такую же футболку :-) Совсем немного... Планируете записать видосик на эту тему?`,
      },
    ],
  },
  {
    id: `X4XKvu`,
    title: `Учим HTML и CSS`,
    announce: `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    fullText: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Рок-музыка всегда ассоциировалась с протестами. `,
    createdDate: `29-12.2021 23:39:13`,
    category: [`Железо`, `Без рамки`, `Деревья`, `За жизнь`],
    comments: [
      {
        id: `0Y_BYi`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором! Совсем немного... Это где ж такие красоты?`,
      },
      {
        id: `_YgdBs`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного... `,
      },
    ],
  },
];

describe(`Articles Api`, () => {
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
  const addOne = async (data) => await request(app).post(`/articles/`).send(data);
  const updateOne = async (id, data) => await request(app).put(`/articles/${id}`).send(data);
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
    const ARTICLE_ID = `X4XKvu`;
    test(`Response status code 200`, async () => {
      const res = await getAll(ARTICLE_ID);

      expect(res.statusCode).toBe(HttpCode.OK);
    });
    test(`Return article with right id`, async () => {
      const res = await getAll(ARTICLE_ID);

      expect(res.body.id).toBe(ARTICLE_ID);
    });

    const FAKE_ID = `fake_id`;
    test(`Return 422 error if pass wrong id`, async () => {
      const res = await getAll(FAKE_ID);

      expect(res.status).toBe(HttpCode.UNPROCESSABLE_ENTITY);
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
    const ARTICLE_ID = `X4XKvu`;
    const oldArticle = mockData.find((el) => el.id === ARTICLE_ID);

    test(`Response status after add 200`, async () => {
      const {status} = await updateOne(ARTICLE_ID, newArticleFields);

      expect(status).toBe(HttpCode.OK);
    });
    test(`Response has new article`, async () => {
      const {body} = await updateOne(ARTICLE_ID, newArticleFields);

      expect(body).toEqual({...oldArticle, ...newArticleFields});
    });

    const FAKE_ID = `fake-id`;
    test(`Response has new article`, async () => {
      const {status} = await updateOne(FAKE_ID, newArticleFields);

      expect(status).toBe(HttpCode.UNPROCESSABLE_ENTITY);
    });
  });

  describe(`Delete article by id`, () => {
    const ARTICLE_ID = `X4XKvu`;
    test(`Response status code 200`, async () => {
      const res = await deleteOne(ARTICLE_ID);

      expect(res.status).toBe(HttpCode.OK);
    });
    test(`Return array without old aricle`, async () => {
      const {body: articles} = await deleteOne(ARTICLE_ID);

      expect(articles).toEqual(mockData.filter((el) => el.id !== ARTICLE_ID));
    });

    const FAKE_ID = `fake_id`;
    test(`Return all acrticles from db`, async () => {
      const res = await deleteOne(FAKE_ID);

      expect(res.status).toBe(HttpCode.UNPROCESSABLE_ENTITY);
    });
  });
});

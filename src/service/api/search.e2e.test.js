"use strict";
const express = require(`express`);
const request = require(`supertest`);

const {createDataBase} = require(`../db/db`);
const {DaoArticles} = require(`../dao`);
const {SearchService} = require(`../api-services`);
const {HttpCode} = require(`../../constants/app`);
const {createSearchRouter} = require(`./search`);
const {mockData} = require(`../test-mock/articles`);

// const mockData = [
//   {
//     id: `VjVObb`,
//     title: `Учим HTML и CSS`,
//     announce: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
//     fullText: `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
//     createdDate: `29-12.2021 23:39:13`,
//     category: [`Без рамки`, `Музыка`, `Кино`],
//     comments: [
//       {
//         id: `mB5hnR`,
//         text: `Хочу такую же футболку :-) Совсем немного... Планируете записать видосик на эту тему?`,
//       },
//     ],
//   },
//   {
//     id: `X4XKvu`,
//     title: `Учим HTML`,
//     announce: `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
//     fullText: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Рок-музыка всегда ассоциировалась с протестами. `,
//     createdDate: `29-12.2021 23:39:13`,
//     category: [`Железо`, `Без рамки`, `Деревья`, `За жизнь`],
//     comments: [
//       {
//         id: `0Y_BYi`,
//         text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором! Совсем немного... Это где ж такие красоты?`,
//       },
//       {
//         id: `_YgdBs`,
//         text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного... `,
//       },
//     ],
//   },
// ];

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

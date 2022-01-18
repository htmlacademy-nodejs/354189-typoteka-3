"use strict";

const USER_ARGV_INDEX = 2;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const HttpCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500, // етого не надо
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422, // тело запроса ок, но не получлиось обработать (например оошибка в xml инструкциях)
  // Ошибка парсинга джейсона на стороне сервера (не смог обработать)
};
/*
200
201
204
400
401
403
404
409
429
*/
const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

const CategoryToId = {
  "Деревья": 0,
  "За жизнь": 1,
  "Без рамки": 2,
  "Разное": 3,
  "IT": 4,
  "Музыка": 5,
  "Кино": 6,
  "Программирование": 7,
  "Железо": 8,
};

const API_PREFIX = `/api`;

module.exports = {
  USER_ARGV_INDEX,
  ExitCode,
  HttpCode,
  Env,
  CategoryToId,
  API_PREFIX,
};

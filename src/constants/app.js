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
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
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
  CategoryToId,
  API_PREFIX,
};

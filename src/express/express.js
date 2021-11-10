"use strict";

const express = require(`express`);
const routersMap = require(`./routes`);

const DEFAULT_PORT = 3000;

const app = express();

Object.entries(routersMap).forEach(([route, router]) => app.use(route, router));

app.use((req, res) => {
  res.status(404);
  res.send(`404: Страница "${req.url}" не найдена`);
});

app.listen(DEFAULT_PORT, () =>
  console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`)
);

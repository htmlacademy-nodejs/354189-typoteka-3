"use strict";

const express = require(`express`);
const path = require(`path`);

const routersMap = require(`./routes`);

const DEFAULT_PORT = process.env.PORT || 3000;
const PUBLIC_DIR = `public`;

const app = express();
app.use(express.static(path.join(__dirname, PUBLIC_DIR)));

app.set(`views`, path.join(__dirname, `./templates`));
app.set(`view engine`, `pug`);

Object.entries(routersMap).forEach(([route, router]) => app.use(route, router));

app.use((req, res) => {
  res.status(404);
  return res.render(`error/404`, {
    headerType: `auth`,
    isColoredBackground: true,
  });
});

app.use((err, req, res, _) => {
  res.status(500);
  return res.render(`error/500`, {
    headerType: `auth`,
    isColoredBackground: true,
  });
});

app.listen(DEFAULT_PORT, () =>
  console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`)
);

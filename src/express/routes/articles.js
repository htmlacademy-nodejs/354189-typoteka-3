"use strict";
const {Router} = require(`express`);
const articlesRouter = new Router();
const api = require(`../api`);
const upload = require(`../middleware/upload`);

articlesRouter.get(`/add`, (req, res) => {
  return res.render(`new-post`, {headerType: `auth`});
});

articlesRouter.post(`/add`, upload.single(`picture`), async (req, res) => {
  const {body, file} = req;

  const articleData = {
    title: body.title,
    picture: file ? file.filename : ``,
    announce: body.announcement,
    fullText: body.fullText,
    date: body.date ? body.date : new Date(),
  };

  try {
    await api.articles.add({data: articleData});
    res.redirect(`/my`);
  } catch (e) {
    res.render(`new-post`, {headerType: `auth`, initialFormValue: articleData});
  }
});

articlesRouter.get(`/:id`, (req, res) => {
  return res.render(`post-detail`, {headerType: `admin`});
});

articlesRouter.get(`/category/:id`, (req, res) =>
  res.render(`aticles-by-category`, {headerType: `auth`})
);

articlesRouter.get(`/edit/:id`, (req, res) =>
  res.send(`/articles/edit/${req.params.id}`)
);

module.exports = articlesRouter;

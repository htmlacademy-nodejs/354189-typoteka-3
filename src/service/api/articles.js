"use strict";
const {Router} = require(`express`);
const {HttpCode} = require(`../../constants/app`);

// import articlesService

const createArticlesRouter = ({parent, articlesService}) => {
  const router = new Router();
  parent.use(`/articles`, router);

  router.get(`/`, async (req, res) => {
    try {
      const articles = await articlesService.getAll();
      res.send(articles);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST);
      res.send(e);
    }
  });

  router.get(`/:articleId`, async (req, res) => {
    const {articleId} = req.params;
    try {
      const article = await articlesService.getById(articleId);
      res.send(article);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST);
      res.send(e.toString());
    }
  });

  router.post(`/`, async (req, res) => {
    // TODO: need validation
    try {
      const article = await articlesService.addOne(req.body);
      res.send(article);
    } catch (e) {
      // не найдена статья
      // не удалось че то сделать
      // валидация не прошла

      // отделить контроллеры от роутера (враппер сделать)
      // во враппере ловить ошибку
      // смотреть и откидываться ошибкой
      // httperrors

      res.status(HttpCode.BAD_REQUEST);
      res.send(e);
    }
  });

  router.put(`/:articleId`, async (req, res) => {
    // TODO: need validation
    const {articleId} = req.params;
    try {
      const article = await articlesService.updateById(articleId, req.body);
      res.send(article);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST);
      res.send(e);
    }
  });

  router.delete(`/:articleId`, async (req, res) => {
    const {articleId} = req.params;
    try {
      const articles = await articlesService.removeById(articleId);
      res.send(articles);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST);
      res.send(e);
    }
  });
};

module.exports = {createArticlesRouter};

"use strict";
const {Router} = require(`express`);
const {HttpCode} = require(`../../constants/app`);

const createArticlesCommensRouter = ({parent, articleCommentsService}) => {
  const router = new Router({mergeParams: true});
  parent.use(`/articles/:articleId/comments`, router);

  router.get(`/`, async (req, res) => {
    const {articleId} = req.params;
    try {
      const comments = await articleCommentsService.getAll(articleId);
      res.send(comments);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST);
      res.send(e);
    }
  });

  router.delete(`/:commentId`, async (req, res) => {
    const {articleId, commentId} = req.params;

    try {
      const comments = await articleCommentsService.removeById({
        articleId,
        commentId,
      });
      res.send(comments);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST);
      res.send(e);
    }
  });

  router.post(`/`, async (req, res) => {
    const {articleId} = req.params;
    const {text} = req.body;
    // TODO: validation
    try {
      const comments = await articleCommentsService.addOne({articleId, text});
      res.send(comments);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST);
      res.send(e);
    }
  });
};

module.exports = {createArticlesCommensRouter};

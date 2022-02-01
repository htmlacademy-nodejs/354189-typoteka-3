"use strict";

const createArticlesCommentsApi = (requestService) => ({
  getAll: async ({articleId}) =>
    await requestService.get(`/articles/${articleId}/comments`),

  add: async ({articleId, text}) =>
    await requestService.post(`/articles/${articleId}/comments`, {text}),

  deleteById: async ({articleId, commentId}) =>
    await requestService.get(`//articles/${articleId}/comments/${commentId}`),
});

module.exports = {createArticlesCommentsApi};

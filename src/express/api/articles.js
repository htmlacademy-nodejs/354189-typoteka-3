"use strict";

const createArticlesApi = (requestService) => ({
  getAll: async () => await requestService.get(`/articles`),

  getById: async ({id}) => await requestService.get(`/articles/${id}`),

  add: async ({data}) => {
    return await requestService.post(`/articles/`, data);
  },

  updateById: async ({id, data}) =>
    await requestService.put(`/articles/${id}`, data),

  deleteById: async ({id}) => await requestService.get(`/articles/${id}`),
});

module.exports = {createArticlesApi};

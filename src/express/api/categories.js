"use strict";

const createCategoriesApi = (requestService) => ({
  getAll: async () => await requestService.get(`/categories`),
});

module.exports = {createCategoriesApi};

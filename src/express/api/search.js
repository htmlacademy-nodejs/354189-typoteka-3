"use strict";

const createSearchApi = (requestService) => ({
  find: async ({query}) =>
    await requestService.get(`/search`, {params: {query}}),
});

module.exports = {createSearchApi};

"use strict";

module.exports = class SearchService {
  constructor(daoArticles) {
    this.daoArticles = daoArticles;
  }

  async search(text) {
    return await this.daoArticles.search(text);
  }
};

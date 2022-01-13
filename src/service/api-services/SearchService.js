"use strict";

module.exports = class SearchService {
  constructor(daoArticles) {
    this.daoArticles = daoArticles;
  }

  async search(text) {
    try {
      return await this.daoArticles.search(text);
    } catch (e) {
      throw e;
    }
  }
};

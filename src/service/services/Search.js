"use strict";

const DaoArticles = require(`../dao/DaoArticles`);

class Search {
  async search(text) {
    try {
      return await DaoArticles.search(text);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = new Search();

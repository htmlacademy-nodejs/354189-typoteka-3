"use strict";

const DaoComments = require(`../dao/DaoComments`);

class ArticlesComments {
  async getAll(articleId) {
    try {
      return await DaoComments.getAll(articleId);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async addOne({articleId, text}) {
    try {
      return await DaoComments.addOne(articleId, text);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async removeById({articleId, commentId}) {
    try {
      return await DaoComments.removeById(articleId, commentId);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = new ArticlesComments();

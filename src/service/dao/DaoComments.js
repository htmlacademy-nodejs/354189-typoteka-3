"use strict";

const db = require(`../db/db`);

class DaoComments {
  async getAll(articleId) {
    try {
      return await db.getAllArticleComments(articleId);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async addOne({articleId, text}) {
    try {
      return await db.addArticleComment(articleId, text);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async removeById({articleId, commentId}) {
    try {
      return await db.deleteArticleComment(articleId, commentId);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = new DaoComments();

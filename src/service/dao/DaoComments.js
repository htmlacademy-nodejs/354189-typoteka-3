"use strict";

module.exports = class DaoComments {
  constructor(db) {
    this.db = db;
  }
  async getAll(articleId) {
    try {
      return await this.db.getArticleComments(articleId);
    } catch (e) {
      throw e;
    }
  }
  async addOne({articleId, text}) {
    try {
      return await this.db.addArticleComment(articleId, text);
    } catch (e) {
      throw e;
    }
  }
  async removeById({articleId, commentId}) {
    try {
      return await this.db.deleteArticleComment(articleId, commentId);
    } catch (e) {
      throw e;
    }
  }
};

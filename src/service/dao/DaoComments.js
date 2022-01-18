"use strict";

module.exports = class DaoComments {
  constructor(db) {
    this.db = db;
  }
  async getAll(articleId) {
    return await this.db.getArticleComments(articleId);
  }
  async addOne({articleId, text}) {
    return await this.db.addArticleComment(articleId, text);
  }
  async removeById({articleId, commentId}) {
    return await this.db.deleteArticleComment(articleId, commentId);
  }
};

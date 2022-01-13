"use strict";

module.exports = class ArticlesCommentsService {
  constructor(daoComments) {
    this.daoComments = daoComments;
  }

  async getAll(articleId) {
    try {
      return await this.daoComments.getAll(articleId);
    } catch (e) {
      throw e;
    }
  }
  async addOne({articleId, text}) {
    try {
      return await this.daoComments.addOne({articleId, text});
    } catch (e) {
      throw e;
    }
  }
  async removeById({articleId, commentId}) {
    try {
      return await this.daoComments.removeById({articleId, commentId});
    } catch (e) {
      throw e;
    }
  }
};

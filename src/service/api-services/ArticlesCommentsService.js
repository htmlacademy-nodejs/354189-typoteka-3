"use strict";

module.exports = class ArticlesCommentsService {
  constructor(daoComments) {
    this.daoComments = daoComments;
  }

  async getAll(articleId) {
    return await this.daoComments.getAll(articleId);
  }
  async addOne({articleId, text}) {
    return await this.daoComments.addOne({articleId, text});
  }
  async removeById({articleId, commentId}) {
    return await this.daoComments.removeById({articleId, commentId});
  }
};

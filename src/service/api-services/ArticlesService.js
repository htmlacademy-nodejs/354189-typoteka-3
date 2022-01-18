"use strict";

module.exports = class ArticlesService {
  constructor(daoArticles) {
    this.daoArticles = daoArticles;
  }

  async getAll() {
    return await this.daoArticles.getAll();
  }
  async getById(id) {
    return await this.daoArticles.getById(id);
  }
  async addOne(data) {
    return await this.daoArticles.addOne(data);
  }
  async updateById(id, data) {
    return await this.daoArticles.updateById(id, data);
  }
  async removeById(id) {
    return await this.daoArticles.removeById(id);
  }
};

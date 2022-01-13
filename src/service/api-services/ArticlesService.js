"use strict";

module.exports = class ArticlesService {
  constructor(daoArticles) {
    this.daoArticles = daoArticles;
  }

  async getAll() {
    try {
      return await this.daoArticles.getAll();
    } catch (e) {
      throw e;
    }
  }
  async getById(id) {
    try {
      return await this.daoArticles.getById(id);
    } catch (e) {
      throw e;
    }
  }
  async addOne(data) {
    try {
      return await this.daoArticles.addOne(data);
    } catch (e) {
      throw e;
    }
  }
  async updateById(id, data) {
    try {
      return await this.daoArticles.updateById(id, data);
    } catch (e) {
      throw e;
    }
  }
  async removeById(id) {
    try {
      return await this.daoArticles.removeById(id);
    } catch (e) {
      throw e;
    }
  }
};

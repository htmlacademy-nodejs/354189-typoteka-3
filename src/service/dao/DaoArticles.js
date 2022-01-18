"use strict";
module.exports = class DaoArticles {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    // try {
    return await this.db.getAllArticles();
    // } catch (e) {
    //   throw e;
    // }
  }
  async getById(id) {
    // try {
    return await this.db.getArticle(id);
    // } catch (e) {
    //   throw e;
    // }
  }
  async addOne(data) {
    // try {
    return await this.db.addArticle(data);
    // } catch (e) {
    //   throw e;
    // }
  }
  async updateById(id, data) {
    // try {
    return await this.db.updateArticle(id, data);
    // } catch (e) {
    //   throw e;
    // }
  }
  async removeById(id) {
    // try {
    return await this.db.deleteArticle(id);
    // } catch (e) {
    //   throw e;
    // }
  }
  async search(text) {
    // try {
    return await this.db.search(text);
    // } catch (e) {
    //   throw e;
    // }
  }
};

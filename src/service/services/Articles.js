"use strict";

const DaoArticles = require(`../dao/DaoArticles`);

class Articles {
  async getAll() {
    try {
      return await DaoArticles.getAll();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getById(id) {
    try {
      return await DaoArticles.getById(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async addOne(data) {
    try {
      return await DaoArticles.addOne(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async updateById(id, data) {
    try {
      return await DaoArticles.updateById(id, data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async removeById(id) {
    try {
      return await DaoArticles.removeById(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = new Articles();

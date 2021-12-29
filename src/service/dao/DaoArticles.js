"use strict";

const db = require(`../db/db`);

class DaoArticles {
  async getAll() {
    try {
      return await db.getAllArticles();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getById(id) {
    try {
      return await db.getArticle(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async addOne(data) {
    try {
      return await db.addArticle(data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async updateById(id, data) {
    try {
      return await db.updateArticle(id, data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async removeById(id) {
    try {
      return await db.getAllArticles(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async search(text) {
    try {
      return await db.search(text);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = new DaoArticles();

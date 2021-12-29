"use strict";

const db = require(`../db/db`);

class DaoCategories {
  async getAll() {
    try {
      return await db.getAllCategories();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = new DaoCategories();

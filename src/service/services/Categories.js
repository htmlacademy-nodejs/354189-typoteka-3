"use strict";

const DaoCategories = require(`../dao/DaoCategories`);

class Categories {
  async getAll() {
    try {
      return await DaoCategories.getAll();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = new Categories();

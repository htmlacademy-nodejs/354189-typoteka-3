"use strict";

module.exports = class DaoCategories {
  constructor(db) {
    this.db = db;
  }
  async getAll() {
    // try {
    return await this.db.getAllCategories();
    // } catch (e) {
    //   throw e;
    // }
  }
};

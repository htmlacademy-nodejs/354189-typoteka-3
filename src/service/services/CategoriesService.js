"use strict";

module.exports = class CategoriesService {
  constructor(daoCategories) {
    this.daoCategories = daoCategories;
  }

  async getAll() {
    try {
      return await this.daoCategories.getAll();
    } catch (e) {
      throw e;
    }
  }
};

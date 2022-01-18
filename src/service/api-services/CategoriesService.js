"use strict";

module.exports = class CategoriesService {
  constructor(daoCategories) {
    this.daoCategories = daoCategories;
  }

  async getAll() {
    return await this.daoCategories.getAll();
  }
};

"use strict";

const {nanoid} = require(`nanoid`);
const fs = require(`fs`).promises;

const {CategoryToId} = require(`../../constants/app`);
const {getFormatedDate} = require(`../../utils`);

const FILEN_PATH = `mocks.json`;
const ID_LENGTH = 6;

const getMockData = async () => {
  try {
    const fileContent = await fs.readFile(FILEN_PATH);
    return JSON.parse(fileContent);
  } catch (err) {
    throw new Error(`Ошибка при чтении базы данных:`, err);
  }
};

const makeDraftComment = () => ({
  id: makeId(),
  text: ``,
});

const makeDraftArticle = () => ({
  id: makeId(),
  title: ``,
  announce: ``,
  fullText: ``,
  createdDate: getFormatedDate(),
  category: `[categories]`,
  comments: `[comments]`,
});

const makeId = () => nanoid(ID_LENGTH);

const mapAtricles = (articles) => {
  const catIds = new Set();
  const categories = [];
  const comments = [];
  const categoriesToArticles = [];
  const mappedArticles = [];
  const articleToComments = [];

  articles.forEach((a) => {
    const mappedArticle = {
      comments: `[comments]`,
      category: `[categories]`,
    };

    a.comments.forEach((c) => {
      comments.push(c);
      articleToComments.push({commentId: c.id, articleId: a.id});
    });

    a.category.forEach((category) => {
      const categoryId = CategoryToId[category];
      if (!catIds.has(categoryId)) {
        categories.push({categoryId, name: category});
        catIds.add(categoryId);
      }
      categoriesToArticles.push({categoryId, articleId: a.id});
    });

    mappedArticles.push({...a, ...mappedArticle});
  });

  return {
    categories,
    comments,
    categoriesToArticles,
    articleToComments,
    articles: mappedArticles,
  };
};

const isEqualSets = (set1, set2) => {
  const s = new Set([...set1, ...set2]);
  return s.size === set1.size && s.size === set2.size;
};

module.exports = {
  makeId,
  mapAtricles,
  getMockData,
  makeDraftComment,
  makeDraftArticle,
  isEqualSets,
};

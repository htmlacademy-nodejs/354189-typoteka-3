"use strict";

const {mapAtricles, makeDraftArticle, makeDraftComment} = require(`./helpers`);

const createDataBase = (initialValue) => {
  let articles = [];
  let comments = [];
  let categories = [];
  let categoriesToArticles = [];
  let articleToComments = [];

  if (initialValue) {
    const mappedArticles = mapAtricles(initialValue);
    articles = mappedArticles.articles;
    comments = mappedArticles.comments;
    categories = mappedArticles.categories;
    categoriesToArticles = mappedArticles.categoriesToArticles;
    articleToComments = mappedArticles.articleToComments;
  }

  const isArticleExist = (id) => Boolean(articles.find((a) => a.id === id));

  const getArticleCategories = (articleId) => {
    const elements = categoriesToArticles.filter(
        (el) => el.articleId === articleId
    );
    const cats = [];
    elements.forEach((el) => {
      const category = categories.find((c) => c.categoryId === el.categoryId);
      cats.push(category);
    });

    return cats;
  };
  const getArticleFullComments = (articleId) => {
    const elements = articleToComments.filter(
        (el) => el.articleId === articleId
    );

    const fullComments = [];
    elements.forEach((el) => {
      const fullComment = comments.find((com) => com.id === el.commentId);
      fullComments.push(fullComment);
    });
    return fullComments;
  };
  const deleteArticleComment = (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) {
      throw new Error(`Нет комментария с id: ${commentId}`);
    }

    comments = comments.filter((el) => el.commentId !== commentId);
    articleToComments = articleToComments.filter(
        (el) => el.commentId !== commentId
    );
  };
  const clearCategoriesToArticles = (articleId) => {
    categoriesToArticles = categoriesToArticles.filter(
        (el) => el.articleId !== articleId
    );
  };
  const clearCommentsByArticleId = (articleId) => {
    const commentsToRemove = articleToComments.filter(
        (el) => el.articleId === articleId
    );
    articleToComments = articleToComments.filter(
        (el) => el.articleId !== articleId
    );
    commentsToRemove.forEach((el) => deleteArticleComment(el.commentId));
  };
  const makeExtendedArticle = (articleId) => {
    const article = articles.find((a) => a.id === articleId);
    const category = getArticleCategories(articleId);
    const fullComments = getArticleFullComments(articleId);
    const extendedArticle = {
      ...article,
      category: category.map((el) => el.name),
      comments: fullComments,
    };
    return extendedArticle;
  };

  return {
    getAllArticles() {
      const extendedArticles = [];

      articles.forEach((a) => extendedArticles.push(makeExtendedArticle(a.id)));

      return Promise.resolve(extendedArticles);
    },
    getArticle(articleId) {
      if (!isArticleExist(articleId)) {
        throw new Error(`Нет статьи с id: ${articleId}`);
      }

      return Promise.resolve(makeExtendedArticle(articleId));
    },
    addArticle(article) {
      const newArticle = {...makeDraftArticle(), ...article};
      articles.push(newArticle);

      return Promise.resolve(makeExtendedArticle(newArticle.id));
    },
    updateArticle(articleId, data) {
      const index = articles.findIndex((a) => a.id === articleId);
      if (index === -1) {
        throw new Error(`Нет статьи с id: ${articleId}`);
      }
      const article = articles[index];
      const newArticle = {...article, ...data};

      articles[index] = newArticle;

      return Promise.resolve(makeExtendedArticle(newArticle.id));
    },
    deleteArticle(articleId) {
      if (!isArticleExist(articleId)) {
        throw new Error(`Нет статьи с id: ${articleId}`);
      }

      clearCategoriesToArticles(articleId);
      clearCommentsByArticleId(articleId);
      articles = articles.filter((a) => a.id !== articleId);

      const extendedArticles = [];
      articles.forEach((a) => extendedArticles.push(makeExtendedArticle(a.id)));
      return Promise.resolve(extendedArticles);
    },
    getArticleComments(articleId) {
      if (!isArticleExist(articleId)) {
        throw new Error(`Нет статьи с id: ${articleId}`);
      }

      const fullComments = getArticleFullComments(articleId);
      return Promise.resolve(fullComments);
    },
    deleteArticleComment(articleId, commentId) {
      if (!isArticleExist(articleId)) {
        throw new Error(`Нет статьи с id: ${articleId}`);
      }

      deleteArticleComment(commentId);
      const fullComments = getArticleFullComments(articleId);
      return Promise.resolve(fullComments);
    },
    addArticleComment(articleId, text) {
      if (!isArticleExist(articleId)) {
        throw new Error(`Нет статьи с id: ${articleId}`);
      }
      const newComment = {...makeDraftComment(), text};
      articleToComments.push({articleId, commentId: newComment.id});
      comments.push(newComment);

      const fullComments = getArticleFullComments(articleId);
      return Promise.resolve(fullComments);
    },

    getAllCategories() {
      const mappedCats = categories.map((el) => el.name);
      return Promise.resolve(mappedCats);
    },
    getArticleCategories(articleId) {
      return Promise.resolve(getArticleCategories(articleId));
    },
    removeCategory(id) {
      const isUsed = categoriesToArticles.some((el) => el.categoryId === id);
      if (isUsed) {
        throw new Error(`Категория используется в других статьях`);
      }
      categories = categories.filter((c) => c.categoryId !== id);

      return Promise.resolve(categories);
    },
    addCategory(name) {
      categories.push({
        name,
        categoryId: categories.length,
      });

      return Promise.resolve(categories);
    },
    addCategoriesToArticles({categoryId, articleId}) {
      categoriesToArticles.push({categoryId, articleId});
    },

    search(string) {
      const foundArticles = [];
      articles.forEach((a) => {
        if (a.title.toLowerCase().includes(string.trim().toLowerCase())) {
          foundArticles.push(a);
        }
      });
      if (!foundArticles.length) {
        return Promise.resolve(foundArticles);
      }

      const extendedArticles = [];
      foundArticles.forEach((a) =>
        extendedArticles.push(makeExtendedArticle(a.id))
      );
      return Promise.resolve(extendedArticles);
    },
  };
};

module.exports = {createDataBase};

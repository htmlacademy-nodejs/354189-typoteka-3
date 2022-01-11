"use strict";

const {
  mapAtricles,
  getMockData,
  makeDraftArticle,
  makeDraftComment,
} = require(`./helpers`);

const createDataBase = () => {
  let articles = [];
  let comments = [];
  let categories = [];
  let categoriesToArticles = [];
  let articleToComments = [];

  (async () => {
    try {
      const mockArticles = await getMockData();
      const mappedArticles = mapAtricles(mockArticles);
      articles = mappedArticles.articles;
      comments = mappedArticles.comments;
      categories = mappedArticles.categories;
      categoriesToArticles = mappedArticles.categoriesToArticles;
      articleToComments = mappedArticles.articleToComments;
    } catch (err) {
      throw new Error(`Ошибка при инициализации базы данных:`, err);
    }
  })();

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
  const getArticleComments = (articleId) => {
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
      throw new Error(`Нет комментария с таким id`);
    }

    comments = comments.filter((el) => el.commentId !== commentId);
    articleToComments = articleToComments.filter(
        (el) => el.commentId !== commentId
    );

    return comments;
  };
  const clearCategoriesToArticles = (articleId) => {
    categoriesToArticles = categoriesToArticles.filter(
        (el) => el.articleId !== articleId
    );
  };
  const makeExtendedArticle = (articleId) => {
    const article = articles.find((a) => a.id === articleId);
    const category = getArticleCategories(articleId);
    const fullComments = getArticleComments(articleId);
    const extendedArticle = {
      ...article,
      category: category.map((el) => el.name),
      comments: fullComments,
    };
    return extendedArticle;
  };

  return {
    async getAllArticles() {
      const extendedArticles = [];

      articles.forEach((a) => extendedArticles.push(makeExtendedArticle(a.id)));

      return Promise.resolve(extendedArticles);
    },
    getArticle(articleId) {
      const index = this.articles.findIndex((a) => a.id === articleId);
      if (index === -1) {
        throw new Error(`Нет статьи с таким id`);
      }

      return Promise.resolve(makeExtendedArticle(articleId));
    },
    addArticle(article) {
      const newArticle = {...makeDraftArticle(), ...article};
      this.articles.push(newArticle);

      return Promise.resolve(makeExtendedArticle(newArticle.id));
    },
    updateArticle(articleId, data) {
      const index = this.articles.findIndex((a) => a.id === articleId);
      if (index === -1) {
        throw new Error(`Нет статьи с таким id`);
      }
      const article = this.articles[index];
      const newArticle = {...article, ...data};

      this.articles[index] = newArticle;

      return Promise.resolve(makeExtendedArticle(newArticle.id));
    },
    deleteArticle(articleId) {
      const article = articles.find((a) => a.id === articleId);
      if (!article) {
        throw new Error(`Нет статьи с таким id`);
      }

      article.comments.forEach(deleteArticleComment);
      clearCategoriesToArticles(articleId);
      articles = articles.filter((a) => a.id !== articleId);

      return Promise.resolve(makeExtendedArticle(articleId));
    },
    getArticleComments(articleId) {
      return Promise.resolve(getArticleComments(articleId));
    },
    deleteArticleComment(commentId) {
      return Promise.resolve(deleteArticleComment(commentId));
    },
    addArticleComment(articleId, text) {
      const article = articles.find((a) => a.id === articleId);
      if (!article) {
        throw new Error(`Статьи с таким id не существую`);
      }
      const newComment = {...makeDraftComment(), text};
      articleToComments.push({articleId, commentId: newComment.id});
      comments.push(newComment);

      return Promise.resolve(comments);
    },

    getAllCategories() {
      return Promise.resolve(categories);
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
      this.categoriesToArticles.push({categoryId, articleId});
    },

    search(string) {
      const foundArticles = [];
      articles.forEach((a) => {
        if (a.title.includes(string)) {
          foundArticles.push(a);
        }
      });
      if (!foundArticles.length) {
        return Promise.resolve(foundArticles);
      }

      const extendedArticles = [];
      articles.forEach((a) => extendedArticles.push(makeExtendedArticle(a.id)));
      return Promise.resolve(extendedArticles);
    },
  };
};

console.log(`here`);
const db = createDataBase();
module.exports = db;

// const db = new DataBase();
// module.exports = db;
// "use strict";

// const {
//   mapAtricles,
//   getMockData,
//   makeDraftArticle,
//   makeDraftComment,
// } = require(`./helpers`);

// class DataBase {
//   constructor() {
//     this.articles = [];
//     this.comments = [];
//     this.categories = [];
//     this.categoriesToArticles = [];
//     this.articleToComments = [];

//     this.init();
//   }

//   async init() {
//     try {
//       const mockArticles = await getMockData();
//       const {
//         articles,
//         comments,
//         categories,
//         categoriesToArticles,
//         articleToComments,
//       } = mapAtricles(mockArticles);
//       this.articles = articles;
//       this.comments = comments;
//       this.categories = categories;
//       this.categoriesToArticles = categoriesToArticles;
//       this.articleToComments = articleToComments;
//     } catch (err) {
//       throw new Error(`Ошибка при инициализации базы данных:`, err);
//     }
//   }

//   _clearCategoriesToArticles(articleId) {
//     this.categoriesToArticles = this.categoriesToArticles.filter(
//         (el) => el.articleId !== articleId
//     );
//   }
//   async _makeExtendedArticle(articleId) {
//     const article = this.articles.find((a) => a.id === articleId);
//     const category = await this.getArticleCategories(articleId);
//     const comments = await this.getArticleComments(articleId);
//     const extendedArticle = {
//       ...article,
//       category: category.map((el) => el.name),
//       comments,
//     };
//     return extendedArticle;
//   }

//   async getAllArticles() {
//     const awaitGroup = [];

//     this.articles.forEach((a) =>
//       awaitGroup.push(this._makeExtendedArticle(a.id))
//     );

//     return Promise.all(awaitGroup);
//   }
//   async getArticle(articleId) {
//     const index = this.articles.findIndex((a) => a.id === articleId);
//     if (index === -1) {
//       throw new Error(`Нет статьи с таким id`);
//     }

//     return await this._makeExtendedArticle(articleId);
//   }
//   async addArticle(article) {
//     const newArticle = {...makeDraftArticle(), ...article};
//     this.articles.push(newArticle);

//     return await this._makeExtendedArticle(newArticle.id);
//   }
//   async updateArticle(articleId, data) {
//     const index = this.articles.findIndex((a) => a.id === articleId);
//     if (index === -1) {
//       throw new Error(`Нет статьи с таким id`);
//     }
//     const article = this.articles[index];
//     const newArticle = {...article, ...data};

//     this.articles[index] = newArticle;

//     return await this._makeExtendedArticle(newArticle.id);
//   }
//   async deleteArticle(articleId) {
//     const article = this.articles.find((a) => a.id === articleId);
//     if (!article) {
//       throw new Error(`Нет статьи с таким id`);
//     }

//     const {comments} = article;
//     comments.forEach((comId) => this.deleteArticleComment(comId));
//     this._clearCategoriesToArticles(articleId);
//     this.articles = this.articles.filter((a) => a.id !== articleId);

//     return await this._makeExtendedArticle(articleId);
//   }

//   getArticleComments(articleId) {
//     const elements = this.articleToComments.filter(
//         (el) => el.articleId === articleId
//     );

//     const fullComments = [];
//     elements.forEach((el) => {
//       const fullComment = this.comments.find((com) => com.id === el.commentId);
//       fullComments.push(fullComment);
//     });

//     return Promise.resolve(fullComments);
//   }
//   async deleteArticleComment(commentId) {
//     const comment = this.comments.find((c) => c.id === commentId);
//     if (!comment) {
//       throw new Error(`Нет комментария с таким id`);
//     }

//     this.comments = this.comments.filter((el) => el.commentId !== commentId);
//     this.articleToComments = this.articleToComments.filter(
//         (el) => el.commentId !== commentId
//     );

//     return this.comments;
//   }
//   addArticleComment(articleId, text) {
//     const article = this.articles.find((a) => a.id === articleId);
//     if (!article) {
//       throw new Error(`Статьи с таким id не существую`);
//     }
//     const newComment = {...makeDraftComment(), text};
//     this.articleToComments.push({articleId, commentId: newComment.id});
//     this.comments.push(newComment);

//     return Promise.resolve(this.comments);
//   }

//   getAllCategories() {
//     return Promise.resolve(this.categories);
//   }
//   getArticleCategories(articleId) {
//     const elements = this.categoriesToArticles.filter(
//         (el) => el.articleId === articleId
//     );
//     const cats = [];
//     elements.forEach((el) => {
//       const category = this.categories.find(
//           (c) => c.categoryId === el.categoryId
//       );
//       cats.push(category);
//     });

//     return Promise.resolve(cats);
//   }
//   removeCategory(id) {
//     const isUsed = this.categoriesToArticles.some((el) => el.categoryId === id);
//     if (isUsed) {
//       throw new Error(`Категория используется в других статьях`);
//     }
//     this.categories = this.categories.filter((c) => c.categoryId !== id);

//     return Promise.resolve(this.categories);
//   }
//   addCategory(name) {
//     this.categories.push({
//       name,
//       categoryId: this.categories.length,
//     });

//     return Promise.resolve(this.categories);
//   }
//   addCategoriesToArticles({categoryId, articleId}) {
//     this.categoriesToArticles.push({categoryId, articleId});
//   }

//   async search(string) {
//     const articles = [];
//     this.articles.forEach((a) => {
//       if (a.title.includes(string)) {
//         articles.push(a);
//       }
//     });
//     if (!articles.length) {
//       return articles;
//     }
//     const awaitGroup = [];

//     articles.forEach((a) => awaitGroup.push(this._makeExtendedArticle(a.id)));

//     return await Promise.all(awaitGroup);
//   }
// }

// const db = new DataBase();
// module.exports = db;

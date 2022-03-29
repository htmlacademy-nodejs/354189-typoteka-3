"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {ExitCode} = require(`../../constants/app`);
const {UserCommand} = require(`../../constants/user-command`);
const {getRandomInt, shuffle} = require(`../../utils`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const MAX_MOCKS_COUNT = 1000;
const DEFAULT_OFFERS_COUNT = 1;
const MAX_ANNOUNCE_SENTENCES = 5;
const MAX_COMMENTS_SENTENCES = 5;
const MAX_COMMENTS_COUNT = 5;
const FILE_NAME = `fill-db.sql`;

const makeMockUsers = (count = 3) =>
  new Array(count).fill(undefined).map((_, index) => ({
    id: index + 1,
    firstName: `testFirstName-${index}`,
    lastName: `testLastNmae-${index}`,
    email: `testEmail${index}@mail.ru`,
    password: `testPassword${index}`,
    avatar: `avatar${index}.jpg`,
  }));

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    const cleanedContent = content
      .split(`\n`)
      .map((str) => str.trim().replace(/\s+/g, ` `))
      .filter((str) => !!str);
    return cleanedContent;
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateCategories = (categories, articleId) =>
  shuffle(categories)
    .slice(0, getRandomInt(1, categories.length - 1))
    .map((el) => ({...el, articleId}));

const generageArticleComments = (comments, articleId) =>
  new Array(getRandomInt(1, MAX_COMMENTS_COUNT)).fill(undefined).map(() => ({
    articleId,
    text: shuffle(comments).slice(MAX_COMMENTS_SENTENCES).join(` `),
  }));

const generateArticles = ({
  count,
  titles,
  categories,
  sentences,
  comments,
  users,
}) =>
  Array(count)
    .fill({})
    .map((_, index) => ({
      articleId: index + 1,
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(1, MAX_ANNOUNCE_SENTENCES).join(` `),
      fullText: shuffle(sentences).slice(MAX_ANNOUNCE_SENTENCES).join(` `),
      category: generateCategories(categories, index + 1),
      comments: generageArticleComments(comments, index + 1),
      userId: users[getRandomInt(0, users.length - 1)].id,
    }));

const generateSqlContent = (articles, categories, user) => {
  const articlesComments = articles.flatMap((a) => a.comments);
  const articlesCategories = articles.flatMap((a) => a.category);

  const userValues = user
    .map(
        ({firstName, lastName, password, avatar, email}) =>
          `('${firstName}', '${lastName}', '${email}', '${password}', '${avatar}')`
    )
    .join(`,\n`);

  const articleValues = articles
    .map(
        ({title, announce, fullText, userId}) =>
          `('${title}', '${announce}', '${fullText}', '${userId}')`
    )
    .join(`,\n`);

  const articlesCommentsValues = articlesComments
    .map(({text, articleId}) => `('${text}', '${articleId}')`)
    .join(`,\n`);

  const articlesCategoriesValues = categories
    .map(({name}) => `('${name}')`)
    .join(`,\n`);

  const categoriesArticlesValue = articlesCategories
    .map(({articleId, categoryId}) => `(${articleId}, ${categoryId})`)
    .join(`,\n`);

  return `
  INSERT INTO users(first_name, last_name, email, password, avatar) VALUES
  ${userValues};
  INSERT INTO articles(title, announce, full_text, user_id) VALUES
  ${articleValues};
  INSERT INTO comments(text, article_id) VALUES
  ${articlesCommentsValues};
  INSERT INTO categories(name) VALUES
  ${articlesCategoriesValues};
  INSERT INTO categories_articles(article_id, category_id) VALUES
  ${categoriesArticlesValue};
  `;
};

module.exports = {
  name: UserCommand.FILL,
  async run(args) {
    const [n] = args;
    if (n > MAX_MOCKS_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_MOCKS_COUNT} объявлений`));
      process.exit(ExitCode.ERROR);
    }

    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);
    const users = makeMockUsers(5);

    const categoriesWithId = categories.map((cat, index) => ({
      name: cat,
      categoryId: index + 1,
    }));

    const countArticles = Number.parseInt(n, 10) || DEFAULT_OFFERS_COUNT;
    const articles = generateArticles({
      count: countArticles,
      titles,
      categories: categoriesWithId,
      sentences,
      comments,
      users,
    });

    const content = generateSqlContent(articles, categoriesWithId, users);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};

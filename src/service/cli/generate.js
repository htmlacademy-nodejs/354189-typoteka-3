"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {ExitCode} = require(`../../constants/app`);
const {UserCommand} = require(`../../constants/user-command`);
const {getRandomInt, shuffle, getFormatedDate} = require(`../../utils`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const MAX_MOCKS_COUNT = 1000;
const DEFAULT_OFFERS_COUNT = 1;
const MAX_ANNOUNCE_SENTENCES = 5;
const MAX_COMMENTS_SENTENCES = 5;
const MAX_COMMENTS_COUNT = 5;
const ID_LENGTH = 6;
const FILE_NAME = `mocks.json`;

const makeId = () => nanoid(ID_LENGTH);

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

const generageComment = (comments) => ({
  id: makeId(),
  text: shuffle(comments).slice(MAX_COMMENTS_SENTENCES).join(` `),
});

const generageComments = (comments) =>
  new Array(getRandomInt(1, MAX_COMMENTS_COUNT))
    .fill(undefined)
    .map(() => generageComment(comments));

const generateOffers = ({count, titles, categories, sentences, comments}) =>
  Array(count)
    .fill({})
    .map(() => ({
      id: makeId(),
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(1, MAX_ANNOUNCE_SENTENCES).join(` `),
      fullText: shuffle(sentences).slice(MAX_ANNOUNCE_SENTENCES).join(` `),
      createdDate: getFormatedDate(),
      category: shuffle(categories).slice(
          0,
          getRandomInt(1, categories.length - 1)
      ),
      comments: generageComments(comments),
    }));

module.exports = {
  name: UserCommand.GENERATE,
  async run(args) {
    const [count] = args;
    if (count > MAX_MOCKS_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_MOCKS_COUNT} объявлений`));
      process.exit(ExitCode.ERROR);
    }

    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const countOffer = Number.parseInt(count, 10) || DEFAULT_OFFERS_COUNT;
    const content = JSON.stringify(
        generateOffers({
          count: countOffer,
          titles,
          categories,
          sentences,
          comments,
        })
    );

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};

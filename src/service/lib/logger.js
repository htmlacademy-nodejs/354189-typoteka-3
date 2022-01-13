"use strict";

const pino = require(`pino`);
const {Env} = require(`../../constants/app`);

const LOG_FILE = `./api.log`;
const isDev = process.env.NODE_ENV === Env.DEVELOPMENT;

const pinoPtions = {
  name: `default-logger`,
  level: process.env.LOG_LEVEL || `info`,
};

if (isDev) {
  pinoPtions.transport = {
    target: `pino-pretty`,
    options: {
      colorize: true,
    },
  };
}

const logger = pino(
    pinoPtions,
    isDev ? process.stdout : pino.destination(LOG_FILE)
);

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  },
};

"use strict";

const axios = require(`axios`);

const port = process.env.API_PORT || 3003;
const defaultUrl = `http://localhost:${port}`;

const requestService = axios.create({
  baseURL: `${defaultUrl}/api`,
  headers: {
    "Content-Type": `application/json`,
    "Accept": `application/json`,
  },
});

module.exports = {requestService};

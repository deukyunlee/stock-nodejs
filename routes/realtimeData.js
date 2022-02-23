const fs = require("fs");
const router = require("express").Router();
const crawling = require("./crawling");
const path = require("path");
const db = require("../app.js");
const API_KEY = process.env.ALPHAVANTAGEAPI;
const delayFunc = require("./delayFuncs");
const axios = require("axios");

//등락율, 심볼, 영어회사명, 한글 회사명,

module.exports = router;

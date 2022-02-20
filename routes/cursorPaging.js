const router = require("express").Router();
const db = require("../app.js");
// const crawling = require("./crawling");
// const axios = require("axios");
// const delayFunc = require("./delayFuncs");
// const API_KEY = process.env.ALPHAVANTAGEAPI;

// 추가 필요
router.get("/", (req, res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;
  let cursor = req.query.cursor;

  limit !== undefined && limit !== "" ? limit : 20;
  offset !== undefined && offset !== "" ? offset : 0;

  limit = parseInt(limit);
  offset = parseInt(offset);

  sql = `SELECT * FROM daily where '${cursor}' < symbol AND timestamp <= NOW() order by ASC limit ${offset}, ${limit}`;
  db.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    // console.log(rows);
  });
});

exports.module = router;

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
  // let cursor = req.query.cursor;
  let cursor;
  limit = limit !== undefined && limit !== "" ? limit : 20;
  offset = offset !== undefined && offset !== "" ? offset : 0;
  // cursor = cursor !== undefined && cursor !== "" ? cursor : 0;

  limit = parseInt(limit);
  offset = parseInt(offset);

  cursor = offset === 0 ? 0 : offset * limit;

  sql = `select * from ( select change_percent, symbol, rank() over(order by volume desc) as ranking from daily where last_trading_day in (select max(last_trading_day) from daily)) ranked where ranked.ranking> ${cursor} limit ${limit}`;

  //select symbol, change_percent, name from (select symbol, change_percent, name, rank1.ranking from (select symbol, change_percent, name, rank() over (order by cap desc) as 'ranking', MAX(last_trading_day) from daily natural join company_info group by symbol) rank1) ranked where ranked.ranking > ${cursor} limit ${offset}, ${limit};
  //sql = `select symbol, change_percent, name from (select symbol, change_percent, name, rank() over (order by cap desc) as 'ranking' from daily natural join company_info where last_trading_day <= NOW() group by symbol) ranked where ranked.ranking > ${cursor} limit ${offset}, ${limit};`;

  //select * from (select symbol, rank() over (order by volume desc) as 'ranking' from daily) ranked where ranked.ranking = 1;
  db.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.json({ rows: rows });
    // console.log(rows);
  });
});

exports.module = router;
module.exports = router;

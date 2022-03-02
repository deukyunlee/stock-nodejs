const router = require("express").Router();
const db = require("../../app.js");
const axios = require("axios");
const delayFunc = require("../delayFuncs");
const API_KEY = process.env.ALPHAVANTAGEAPI;
router.post("/", function (req, res, next) {
  let sql = `select date,close, (close - lag(close, 1) over (order by date)) as value, ((close-lag(close, 1) over (order by date))/lag(close, 1) over (order by date)*100) as percent from daily where symbol = 'aapl';`;
  db.query(sql, function (err, rows, fields) {
    for (var i in rows) {
      let date = rows[i].date;
      console.log(date);
      let value = rows[i].value;
      let percent = rows[i].percent;
      sql = `update daily set change_percent = ?, change_value = ${value} where symbol = 'aapl' and date = '${date}'`;
      db.query(sql, percent, function (err, rows, fields) {});
    }
  });
});

module.exports = router;

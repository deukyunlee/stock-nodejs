const router = require("express").Router();
const db = require("../app.js");
const crawling = require("./crawling");
const axios = require("axios");
const delayFunc = require("./delayFuncs");
const API_KEY = process.env.ALPHAVANTAGEAPI;

router.post("/", function (req, res, next) {
  const sql = `select symbol from (select symbol, rank() over (order by cap desc) as 'ranking' from company_info) ranked where ranked.ranking <=100;`;
  //select symbol from (select symbol, rank() over (order by cap desc) as 'ranking' from company_info) ranked where ranked.ranking <=100;
  async function getSymbol(countResult) {
    let symbol;
    let count = 500;

    for (var i in countResult) {
      await delayFunc.sleep(12050).then(() => {
        symbol = new Promise((resolve, reject) => {
          console.log(countResult[i].symbol);
          resolve(countResult[i].symbol);
        }).then((symbol) => {
          let url = [];
          console.log(i);
          url = new Promise((resolve, reject) => {
            for (var i in symbol) {
              url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
            }

            console.log(url);
            resolve(url);
          }).then((url) => {
            axios({
              method: "get",
              url: url,
            }).then((res) => {
              //   console.log(res.data);
              let res2 = res.data;
              const content = res2["Global Quote"];
              const sy = content["01. symbol"];
              const open = content["02. open"];
              const high = content["03. high"];
              const low = content["04. low"];
              const close = content["05. price"];
              const volume = content["06. volume"];
              const ltd = content["07. latest trading day"];
              const change = content["09. change"];
              const changePercent = content["10. change percent"];
              if (sy) {
                const sql = `insert IGNORE into daily(symbol, open, high, low, close, volume, last_trading_day, change_value, change_percent) values (?)`;
                count -= 1;
                console.log(
                  symbol +
                    " inserted into database : " +
                    count +
                    " symbols left"
                );
                const array = [
                  sy,
                  open,
                  high,
                  low,
                  close,
                  volume,
                  ltd,
                  change,
                  changePercent,
                ];
                console.log(array);
                db.query(sql, [array], function (err, rows, fields) {});
              }
            });
          });
        });
      });
    }
  }

  db.query(sql, (err, countResult) => {
    try {
      getSymbol(countResult);
    } catch (exception) {
      console.log(exception);
    }
  });
});

router.get("/full-data/:symbol", function (req, res) {
  const symbol = req.params.symbol;
  const sql = `SELECT * from daily where symbol = ?`;
  db.query(sql, symbol, function (err, rows, fields) {
    res.json(rows);
  });
});

router.get("/interval", (req, res) => {
  const symbol = req.query.symbol;
  const period = req.query.period;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  let interval = "";
  let date_notYear = "";
  let sql = "";

  if (req.query.interval > 0) interval = "/" + req.query.interval;

  if (period != "year") date_notYear = 'DATE_FORMAT(timestamp, "%y"), ';

  /* high: highest, low: lowest volume: sum other than that is as it is*/
  sql = `SELECT symbol, DATE_FORMAT(timestamp,'%Y-%m-%d') as date, open,
         max(high) as high, min(low) as low, close, sum(volume)
         FROM daily WHERE symbol = '${symbol}' AND timestamp BETWEEN '${startDate}' AND '${endDate}' GROUP BY ${date_notYear}
         FLOOR(${period}(timestamp)${interval}) ORDER BY date;`;

  /*select name, timestamp, open, max(high) as high, min(low) as low, close, sum(volume) as volume from daily where name = 'aapl' and timestamp between '2020-01-01' and '2022-01-01' group by date_format(timestamp, "%y"), FLOOR(month(timestamp)/1) order by timestamp;*/
  db.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
    // console.log(rows);
  });
});

module.exports = router;

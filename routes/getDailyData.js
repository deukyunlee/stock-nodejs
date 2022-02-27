const router = require("express").Router();
const db = require("../app.js");
const crawling = require("./crawling");
const axios = require("axios");
const delayFunc = require("./delayFuncs");
const API_KEY = process.env.ALPHAVANTAGEAPI;

//  let sql = `select id from sequence where t_name = "daily"`;

//sql = `select LEAD(symbol, ${id}) over (order by symbol) from daily group by symbol;`;

router.post("/", function (req, res, next) {
  // async function here() {

  //   let symbol;

  //   let id;
  //   await db.query(sql, (err, currentId) => {
  //     id = currentId;
  //   });
  //   await console.log(id);
  // }

  async function SymbolExists(curId) {
    let count = 500;
    let url = [];
    let resApi;
    let resData;
    let content;
    let symbol;
    // console.log(curId[0].id);
    id = curId[0].id;

    let sql = `select LEAD(symbol, ${id}) over (order by symbol) as list from company_info group by symbol;`;
    try {
      console.log("here");
      db.query(sql, async (err, result) => {
        if (result.length !== 0) {
          for (var i in result) {
            await delayFunc.sleep(12050);
            id += 1;
            symbol = result[i].list;
            if (symbol) {
              try {
                url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
                console.log(url);
              } catch {
                console.log("symbol or url not found");
              }
            }
            try {
              resApi = await axios({
                method: "get",
                url: url,
              });
              console.log(resApi);
            } catch {
              console.log("axios failed");
            }

            try {
              resData = resApi.data;
            } catch {
              console.log("no data");
            }

            try {
              content = await resData["Time Series (Daily)"];
              if (content) {
                const keys = Object.keys(content);

                let sql = `insert IGNORE into daily(symbol, timestamp, open, high,low,close,volume) values (?)`;

                count -= 1;
                console.log(
                  symbol +
                    " inserted into database : " +
                    count +
                    " symbols left"
                );

                keys.forEach(function (key, index) {
                  const row = content[key];
                  const date = keys[index];
                  const open = parseFloat(row["1. open"]);
                  const high = parseFloat(row["2. high"]);
                  const low = parseFloat(row["3. low"]);
                  const close = parseFloat(row["4. close"]);
                  const volume = parseInt(row["5. volume"]);
                  const array = [symbol, date, open, high, low, close, volume];
                  db.query(sql, [array], function (err, rows, fields) {});
                });

                let sql2 = `UPDATE sequence SET id = ${id}, symbol = '${symbol}' where t_name = "daily";`;
                db.query(sql2, function (err, rows, fields) {});

                console.log(id);
              }
            } catch {
              console.log("sql error");
            }
            // console.log(array);
          }
        } else {
          DbQuery();
        }
      });
    } catch {
      console.log("no data");
    }
  }

  let sql = `select id from sequence where t_name = "daily";`;

  db.query(sql, (err, countId) => {
    try {
      if (countId.length !== 0) SymbolExists(countId);
      else DbQuery();
    } catch (exception) {
      console.log(exception);
    }
  });

  //const sql = `select symbol from (select symbol, rank() over (order by cap desc) as 'ranking' from company_info) ranked where ranked.ranking <=100;`;

  // 500개의 데이터 중 시총 순으로 100개만 정렬해서 DB에 들어감
  // select symbol from daily;
  // .then 블럭 async/await으로 리팩토링 필요
  async function SymbolNotExists(countResult) {
    let symbol;
    let count = 500;
    let url = [];
    let res;
    let resData;
    let content;
    let id = 0;
    for (var i in countResult) {
      await delayFunc.sleep(12050);
      id += 1;
      try {
        symbol = countResult[i].symbol;

        for (var i in symbol) {
          url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
        }
      } catch {
        console.log("symbol or url not found");
      }
      try {
        res = await axios({
          method: "get",
          url: url,
        });
      } catch {
        console.log("axios failed");
      }

      try {
        resData = res.data;
      } catch {
        console.log("no data");
      }

      try {
        content = await resData["Time Series (Daily)"];
        if (content) {
          const keys = Object.keys(content);

          const sql = `insert IGNORE into daily(symbol, timestamp, open, high,low,close,volume) values (?)`;

          count -= 1;
          console.log(
            symbol + " inserted into database : " + count + " symbols left"
          );

          keys.forEach(function (key, index) {
            const row = content[key];
            const date = keys[index];
            const open = parseFloat(row["1. open"]);
            const high = parseFloat(row["2. high"]);
            const low = parseFloat(row["3. low"]);
            const close = parseFloat(row["4. close"]);
            const volume = parseInt(row["5. volume"]);
            const array = [symbol, date, open, high, low, close, volume];
            db.query(sql, [array], function (err, rows, fields) {});
          });
          let sql2 = `UPDATE sequence SET id = ${id}, symbol = '${symbol}' where t_name = "daily";`;
          db.query(sql2, function (err, rows, fields) {});

          console.log(id);
        }
      } catch {
        console.log("sql error");
      }
      // console.log(array);
    }
  }
  function DbQuery() {
    let sql = `select symbol from company_info`;
    db.query(sql, (err, countResult) => {
      try {
        let sql3 = `INSERT INTO sequence VALUES(1, "daily", "A")`;
        db.query(sql3, function (err, rows, fields) {});
        SymbolNotExists(countResult);
      } catch (exception) {
        console.log(exception);
      }
    });
  }
});

router.get("/full-data/:symbol", function (req, res) {
  const symbol = req.params.symbol;
  const sql = `SELECT * from daily where symbol = ?`;
  db.query(sql, symbol, function (err, rows, fields) {
    // res.json(rows);
    try {
      res.json(rows);
    } catch (err) {
      console.log(err);
    }
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
    try {
      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = router;

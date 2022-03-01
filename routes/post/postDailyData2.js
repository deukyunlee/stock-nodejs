const router = require("express").Router();
const db = require("../../app.js");
const axios = require("axios");
const delayFunc = require("../delayFuncs");
const API_KEY = process.env.ALPHAVANTAGEAPI;

//  let sql = `select id from sequence where t_name = "daily"`;

//sql = `select LEAD(symbol, ${id}) over (order by symbol) from daily group by symbol;`;

router.post("/", function (req, res, next) {
  async function SymbolExists(curId) {
    let count = 500;
    let url = [];
    let resApi;
    let resData;
    let content;
    let symbol;
    // console.log(curId[0].id);
    let id = curId[0].id;
    count -= id;
    let sql = `select LEAD(symbol, ${id}) over (order by symbol) as list from company_info group by symbol;`;
    try {
      console.log("here");
      db.query(sql, async (err, result) => {
        if (result.length !== 0) {
          for (var i in result) {
            await delayFunc.sleep(12050);
            id += 1;
            count -= 1;
            symbol = result[i].list;
            if (symbol) {
              try {
                url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
                // console.log(url);
              } catch {
                console.log("symbol or url not found");
              }
            }
            try {
              resApi = await axios({
                method: "get",
                url: url,
              });
              // console.log(resApi);
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

                // console.log(id);
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

          console.log(
            symbol + " inserted into database : " + count - id + " symbols left"
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

router.post("/start", function (req, res, next) {
  DbQuery();
});
module.exports = router;

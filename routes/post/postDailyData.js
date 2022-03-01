const router = require("express").Router();
const db = require("../../app.js");
const axios = require("axios");
const delayFunc = require("../delayFuncs");
const API_KEY = process.env.ALPHAVANTAGEAPI;

//  let sql = `select id from sequence where t_name = "daily"`;

//sql = `select LEAD(symbol, ${id}) over (order by symbol) from daily group by symbol;`;

//select symbol from daily group by symbol having max(timestamp) = '2022-02-25';
router.post("/", function (req, res, next) {
  let symbol = "A";
  async function getDaily() {
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
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

        // console.log(
        //   symbol + " inserted into database : " + count + " symbols left"
        // );

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
        sql = `select max(timestamp) as max from daily where symbol = 'a'`;
        db.query(sql, function (err, rows, fields) {
          console.log(rows[0].max);
          let max = rows[0].max;
          sql = `UPDATE company_info SET updatedAt = ? where symbol = "a";`;
          db.query(sql, max, function (err, rows, fields) {
            sql = `SELECT symbol from daily GROUP BY symbol having max(timestamp)<'${max}'`;
            db.query(sql, function (err, rows, fields) {
              for (var i in rows) {
                console.log(rows[i].symbol);
              }
            });
          });
        });

        // console.log(id);
      }
    } catch {
      console.log("sql error");
    }
  }
  getDaily();
});

module.exports = router;

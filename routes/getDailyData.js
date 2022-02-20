const router = require("express").Router();
const db = require("../app.js");
const crawling = require("./crawling");
const axios = require("axios");
const delayFunc = require("./delayFuncs");
const API_KEY = process.env.ALPHAVANTAGEAPI;

router.post("/", function (req, res) {
  // cron.schedule("0 * * * *", symbolCreator)
  async function getSymbol() {
    let count = 100;
    let symbol;
    var data = await crawling.crawlSymbol();
    // data2 = fs.readFileSync("./symbol.json")
    // parsedData = JSON.stringify(parsedData)
    for (var key in data) {
      //console.log(data);
      url = new Array();
      //   console.log(data[key].title);
      symbol = data[key].symbol;
      url[
        key
      ] = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;

      //   console.log(url[key]);
      await delayFunc.sleep(12050).then(() =>
        axios({
          method: "get",
          url: url[key],
        })
          .then((res) => {
            //   console.log(res.data);
            var res2 = res.data;
            var content = res2["Time Series (Daily)"];

            if (content) {
              const keys = Object.keys(content);
              // console.log(keys)

              const sql = `insert IGNORE into daily(symbol, timestamp, open, high,low,close,volume) values (?)`;
              count -= 1;
              console.log(
                symbol + " inserted into database : " + count + " symbols left"
              );

              // extract and insert data from API into mysql DB
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
            }
          })
          .catch(() => {
            console.log("rejected");
          })
      );
    }
  }
  getSymbol().then(() => {
    console.log("-----all the pieces of data are inserted!-----");
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

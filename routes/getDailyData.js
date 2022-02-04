const router = require("express").Router();
const db = require("../app.js");
const cheerio = require("cheerio");
const fs = require("fs");
const axios = require("axios");
const request = require("request");

const API_KEY = process.env.ALPHAVANTAGEAPI;
let count = 100;
let symbol;

var List = [];
router.post("/", function (req, res) {
  function symbolCreator() {
    return new Promise(function (resolve, reject) {
      request(
        "https://www.tradingview.com/markets/stocks-usa/market-movers-large-cap/",
        (error, response, html) => {
          if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);
            const $symbolResults = $(
              ".tv-data-table__row.tv-data-table__stroke.tv-screener-table__result-row"
            );
            $symbolResults.each(function (i, result) {
              List[i] = {
                title: $(this).find("div").find("div").find("a").text(),
                company: $(this)
                  .find("div")
                  .find("div")
                  .find("span")
                  .text()
                  .replace(/[\n\t\r]/g, ""),
                price: $(this).find("td:nth-of-type(2)").text(),
                percent: $(this).find("td:nth-of-type(3)").text(),
              };
              if (List[i].percent !== "0.00%" && List[i].percent[0] !== "-") {
                List[i].percent = "+" + List[i].percent;
              }
            });
            const data = List.filter((n) => n.title); // 같이 바꾸기
            const jsonData = JSON.stringify(data);
            jsonData2 = "{" + '"' + "symbols" + '"' + ":" + jsonData + "}";
            fs.writeFileSync("./symbol.json", jsonData2);
            console.log("JSON created");
            resolve(data);
          } else {
            reject(error);
          }
        }
      );
    });
  }
  const delay = () => {
    const randomDelay = Math.floor(Math.random() * 4) * 100;
    return new Promise((resolve) => setTimeout(resolve, randomDelay));
  };

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }
  // cron.schedule("0 * * * *", symbolCreator)
  async function getSymbol() {
    var data = await symbolCreator();
    // data2 = fs.readFileSync("./symbol.json")
    // parsedData = JSON.stringify(parsedData)
    for (var key in data) {
      //console.log(data);
      url = new Array();
      //   console.log(data[key].title);
      symbol = data[key].title;
      url[
        key
      ] = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;

      //   console.log(url[key]);
      await sleep(15000).then(() =>
        axios({
          method: "get",
          url: url[key],
        }).then((res) => {
          //   console.log(res.data);
          var res2 = res.data;
          var content = res2["Time Series (Daily)"];

          if (content) {
            const keys = Object.keys(content);
            // console.log(keys)

            const sql = `insert IGNORE into daily(name, timestamp, open, high,low,close,volume) values (?)`;
            count -= 1;
            console.log(
              symbol + " inserted into database : " + count + " symbols left"
            );
            if (count === 0)
              console.log("all the pieces of daily data are inserted!");

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
      );
    }
  }
  getSymbol();
});
module.exports = router;

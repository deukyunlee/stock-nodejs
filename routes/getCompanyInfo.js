const router = require("express").Router();
const db = require("../app.js");
const crawling = require("./crawling");
const axios = require("axios");
const delayFunc = require("./delayFuncs");
const API_KEY = process.env.ALPHAVANTAGEAPI;
let count = 100;
let symbol;

router.post("/", function (req, res) {
  // cron.schedule("0 * * * *", symbolCreator)
  async function getSymbol() {
    var data = await crawling.crawlSymbol();
    // data2 = fs.readFileSync("./symbol.json")
    // parsedData = JSON.stringify(parsedData)
    for (var key in data) {
      //console.log(data);
      url = new Array();
      //   console.log(data[key].title);
      symbol = data[key].title;
      url[
        key
      ] = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
      //   console.log(url[key]);
      await delayFunc.sleep(15000).then(() =>
        axios({
          method: "get",
          url: url[key],
        }).then((res) => {
          //   console.log(res.data);
          var res2 = res.data;
          var content = res2["Description"];

          if (content) {
            const keys = Object.keys(content);
            // console.log(keys)
            console.log(content);
            const sql = `insert IGNORE into company_info(name, description) values (?)`;
            count -= 1;
            console.log(
              symbol + " inserted into database : " + count + " symbols left"
            );
            if (count === 0)
              console.log("all the pieces of daily data are inserted!");

            const array = [symbol, content];
            db.query(sql, [array], function (err, rows, fields) {});
          }
        })
      );
    }
  }
  getSymbol();
});

module.exports = router;
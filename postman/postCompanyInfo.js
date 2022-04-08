const router = require("express").Router();
const db = require("../../app.js");
const crawling = require("../crawling");
const axios = require("axios");
const delayFunc = require("../delayFuncs");
const API_KEY = process.env.ALPHAVANTAGEAPI;

// cron.schedule("0 * * * *", symbolCreator)
const company = async function getSymbol() {
  let symbol;
  let count = 500;
  const data = await crawling.crawlSymbol();

  for (var key in data) {
    url = new Array();
    symbol = data[key].symbol;
    url[
      key
    ] = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;

    await delayFunc.sleep(12050).then(() =>
      axios({
        method: "get",
        url: url[key],
      })
        .then((res) => {
          let res2 = res.data;
          const description = res2["Description"];
          const marketCap = res2["MarketCapitalization"];
          const name = res2["Name"];
          if (marketCap) {
            const sql = `insert IGNORE into company_info(symbol, name, description, cap) values (?)`;
            count -= 1;
            console.log(
              symbol + " inserted into database : " + count + " symbols left"
            );

            const array = [symbol, name, description, marketCap];
            db.query(sql, [array], function (err, rows, fields) {});
          }
        })
        .catch(() => {
          console.log("rejected");
        })
    );
  }
};
getSymbol().then(() => {
  console.log("-----all the pieces of data are inserted!-----");
});

module.exports = company;
const db = require("../../app.js");
const axios = require("axios");
const delayFunc = require("../funcs/delayFuncs");
const API_KEY = process.env.ALPHAVANTAGEAPI;
module.exports.insert_company_cap = async function getSymbol() {
  sql = `select symbol from company_info`;

  var data;
  db.query(sql, (err, result) => {
    console.log(result[0].symbol);
  });
  //   console.log(data);
  //   let symbol;
  //   let count = 500;
  //   const data = await crawling.crawlSymbol();
  //   for (var key in data) {
  //     url = new Array();
  //     symbol = data[key].symbol;
  //     url[
  //       key
  //     ] = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
  //     await delayFunc.sleep(12050).then(() =>
  //       axios({
  //         method: "get",
  //         url: url[key],
  //       })
  //         .then((res) => {
  //           let res2 = res.data;
  //           const marketCap = res2["MarketCapitalization"];
  //           if (marketCap) {
  //             const sql = `insert IGNORE into company_info(cap) values (?) where symbol =?`;
  //             count -= 1;
  //             console.log(
  //               symbol + " inserted into database : " + count + " symbols left"
  //             );
  //             const array = [marketCap, symbol];
  //             db.query(sql, [array], function (err, rows, fields) {});
  //           }
  //         })
  //         .catch(() => {
  //           console.log("rejected");
  //         })
  //     );
  //   }
};

const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
var List = [];
const crawlSymbol = function () {
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
              symbol: $(this).find("div").find("div").find("a").text(),
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
          const data = List.filter((n) => n.symbol); // 같이 바꾸기
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
};

module.exports = { crawlSymbol };

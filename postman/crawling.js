const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
var List = [];
const crawlSymbol = function () {
  return new Promise(function (resolve, reject) {
    request(
      "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies",
      (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);
          const $symbolResults = $(".mw-parser-output")
            .find("table")
            .find("tbody")
            .find("tr");
          $symbolResults.each(function (i, result) {
            List[i] = {
              symbol: $(this).find("td:nth-of-type(1)").find("a").text(),
            };
            // console.log(List[i].symbol);
          });
          // console.log($symbolResults);
          // console.log(List[1]);
          // console.log("this" + List[1].symbol);
          const data = List.filter((n) => n.symbol); // 같이 바꾸기
          // console.log(data);
          // const jsonData = JSON.stringify(data);
          // jsonData2 = "{" + '"' + "symbols" + '"' + ":" + jsonData + "}";
          // fs.writeFileSync("./symbol.json", jsonData2);
          // console.log("JSON created");
          resolve(data);
        } else {
          reject(error);
        }
      }
    );
  });
};

module.exports = { crawlSymbol };

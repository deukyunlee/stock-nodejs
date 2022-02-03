const router = require("express").Router();
// import router from "express";
// import request from "request";
// import cheerio from "cheerio";
// import fs from "fs";
// import got from "got";
// router = router.Router();
const request = require("request");

const cheerio = require("cheerio");
const fs = require("fs");
const axios = require("axios");
const { json } = require("express");
const API_KEY = "JDBVQUW2HL07WAGK";
// import got from "got";

// const got = require("got");
var List = []; //list to store symbols of company
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
            // console.log(data)
            const jsonData = JSON.stringify(data);
            jsonData2 = "{" + '"' + "symbols" + '"' + ":" + jsonData + "}";
            fs.writeFileSync("./symbol.json", jsonData2);
            console.log("JSON created");
            resolve(data);
          } else {
            reject(error);
          }
          // console.log($.text())
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
      url[
        key
      ] = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${data[key].title}&outputsize=compact&apikey=${API_KEY}`;
      //console.log(url[key]);

      //   console.log(url[key]);
      await sleep(15000).then(() =>
        axios({
          method: "get",
          url: url[key],
        }).then((res) => {
          console.log(res);
          //   res2 = JSON.parse(res);
          //   res2 = JSON.parse(res);
          //   res2 = JSON.stringify(res);
          //   console.log(res2.data);
          //   content = res2["data"]["Time Series (Daily)"];
          //   console.log(content);
        })
      );
      //   console.log(data2);
    }
  }

  getSymbol();
});
module.exports = router;

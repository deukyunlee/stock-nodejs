const fs = require("fs");
const router = require("express").Router();
const axios = require("axios");
var db = require("../app.js");

var url;

router.get("/list/:id", function (req, res) {
  let currentPage = req.query.offset;
  let id = req.params.id;
  const size = Number(req.query.limit); // 한 페이지에서 보여줄 데이터 수
  const pnSize = 10; // 페이지 네이션 할 갯수

  if (currentPage <= 0) {
    currentPage = 1;
  } else {
    start = (currentPage - 1) * size;
  }
  const skipSize = (currentPage - 1) * size;
  const sql = `SELECT count(*) as 'cnt' FROM daily`;
  db.query(sql, (err, countResult) => {
    if (err) throw err;
    const totalCount = Number(countResult[0].cnt); // total num of contents
    const totalPage = Math.ceil(totalCount / size);
    const symbolStart = (Math.ceil(currentPage / pnSize) - 1) * pnSize + 1;
    let symbolEnd = symbolStart + pnSize - 1;
    db.query(
      `Select * FROM daily where name = '${id}' LIMIT ?, ?`,
      [skipSize, size],
      (err, contentResult) => {
        if (err) throw err;
        if (symbolEnd > totalPage) symbolEnd = totalPage;
        const result = {
          currentPage,
          symbolStart,
          // symbolEnd,
          // totalPage,
          contents: contentResult,
        };
        res.send(result);
      }
    );
  });
});

router.get("/symbol/:name", function (req, res) {
  let name = req.params.name;
  db.query(
    `select symbol from list where match(symbol) against('${name}' in boolean mode);`,
    (err, rows) => {
      res.send(rows);
    }
  );
});

// router.post("/", function (req, res) {
//   function symbolCreator() {
//     return new Promise(function (resolve, reject) {
//       request(
//         "https://www.tradingview.com/markets/stocks-usa/market-movers-large-cap/",
//         (error, response, html) => {
//           if (!error && response.statusCode === 200) {
//             const $ = cheerio.load(html);
//             const $symbolResults = $(
//               ".tv-data-table__row.tv-data-table__stroke.tv-screener-table__result-row"
//             );
//             $symbolResults.each(function (i, result) {
//               List[i] = {
//                 title: $(this).find("div").find("div").find("a").text(),
//                 company: $(this)
//                   .find("div")
//                   .find("div")
//                   .find("span")
//                   .text()
//                   .replace(/[\n\t\r]/g, ""),
//                 price: $(this).find("td:nth-of-type(2)").text(),
//                 percent: $(this).find("td:nth-of-type(3)").text(),
//               };
//               if (List[i].percent !== "0.00%" && List[i].percent[0] !== "-") {
//                 List[i].percent = "+" + List[i].percent;
//               }
//             });
//             const data = List.filter((n) => n.title); // 같이 바꾸기
//             // console.log(data)
//             const jsonData = JSON.stringify(data);
//             jsonData2 = "{" + '"' + "symbols" + '"' + ":" + jsonData + "}";
//             fs.writeFileSync("./symbol.json", jsonData2);
//             console.log("JSON created");
//             resolve(data);
//           } else {
//             reject(error);
//           }
//           // console.log($.text())
//         }
//       );
//     });
//   }

//   // cron.schedule("0 * * * *", symbolCreator)
//   async function getSymbol() {
//     url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=compact&apikey=${API_KEY}`;
//     var symbol = "AAPL";
//     request(url, function (error, response, body) {
//       // console.log(url[key])
//       // console.log("here")
//       const data = JSON.parse(body);
//       content = data["Time Series (Daily)"];

//       if (content) {
//         // get key for date
//         const keys = Object.keys(content);
//         // console.log(keys)

//         const sql = `insert IGNORE into daily(name, timestamp, open, high,low,close,volume) values (?)`;
//         console.log("1");

//         // extract and insert data from API into mysql DB
//         keys.forEach(function (key, index) {
//           const row = content[key];
//           const date = keys[index];
//           const open = parseFloat(row["1. open"]);
//           const high = parseFloat(row["2. high"]);
//           const low = parseFloat(row["3. low"]);
//           const close = parseFloat(row["4. close"]);
//           const volume = parseInt(row["5. volume"]);
//           const array = [symbol, date, open, high, low, close, volume];
//           db.query(sql, [array], function (err, rows, fields) {
//             // console.log(symbol)
//           });
//         });
//       }
//     });
//   }
//   getSymbol();
// });
module.exports = router;

const db = require("../../app.js");
const axios = require("axios");
const delayFunc = require("./delayFuncs");
const API_KEY = process.env.ALPHAVANTAGEAPI;

module.exports.insert_daily_data = async function getDaily() {
  console.log("insert");
  let symbol = "A";
  let resApi;
  let resData;
  let content;
  let count;
  let id = 0;
  let url = [];

  url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
  try {
    resApi = await axios({
      method: "get",
      url: url,
    });
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

      let sql = `insert IGNORE into daily(symbol, date, open, high,low,close,volume) values (?)`;

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
      sql = `select max(date) as max from daily where symbol = 'a'`;
      db.query(sql, function (err, rows, fields) {
        let max = rows[0].max;
        sql = `UPDATE company_info SET updatedAt_daily = ? where symbol = "a";`;
        db.query(sql, max, function (err, rows, fields) {
          sql = `SELECT symbol from company_info where updatedAt_daily<'${max}' OR updatedAt_daily IS null`;
          db.query(sql, async function (err, rows, fields) {
            for (var i in rows) {
              let symbol = rows[i].symbol;
              await delayFunc.sleep(12050);
              count = rows.length - id;
              id += 1;
              // console.log(count);

              if (symbol) {
                try {
                  url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
                  // console.log(url);
                } catch {
                  console.log("symbol or url not found");
                }
              }
              try {
                resApi = await axios({
                  method: "get",
                  url: url,
                });
              } catch {
                console.log("axios failed");
              }

              try {
                resData = resApi.data;
              } catch {
                console.log("no data");
              }

              let content = await resData["Time Series (Daily)"];
              if (content) {
                const keys = Object.keys(content);

                let sql = `insert IGNORE into daily(symbol, date, open, high,low,close,volume) values (?)`;

                console.log(
                  `${symbol} inserted into database : ${count} symbols left`
                );

                keys.forEach(function (key, index) {
                  const row = content[key];
                  const date = keys[index];
                  const open = parseFloat(row["1. open"]);
                  const high = parseFloat(row["2. high"]);
                  const low = parseFloat(row["3. low"]);
                  const close = parseFloat(row["4. close"]);
                  const volume = parseInt(row["5. volume"]);
                  const array = [symbol, date, open, high, low, close, volume];
                  db.query(sql, [array], function (err, rows, fields) {
                    if (err) console.log(err);
                  });
                });

                let sql2 = `UPDATE company_info SET updatedAt_daily='${max}' where symbol = ?`;
                db.query(sql2, symbol, function (err, rows, fields) {
                  if (err) console.log(err);
                  let sql3 = `select date, (close - lag(close, 1) over (order by date)) as value, ((close - lag(close, 1) over (order by date))/ lag(close, 1) over (order by date)*100) as percent from daily where symbol = ?;`;
                  db.query(sql3, symbol, function (err, rows, fields) {
                    for (var i in rows) {
                      let date = rows[i].date;
                      let value = rows[i].value;
                      let percent = rows[i].percent;
                      sql = `update daily set change_percent = '${percent}', change_value = ${value} where symbol = ? and date = '${date}'`;
                      db.query(sql, symbol, function (err, rows, fields) {});
                    }
                  });
                });
              }
            }
          });
        });
      });
    }
  } catch {
    console.log("sql error");
  }
};

module.exports.insert_intraday_data = async function getIntraday() {
  let symbol = "A";
  let resApi;
  let resData;
  let content;
  let count;
  let id = 0;
  let url = [];

  url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
  try {
    resApi = await axios({
      method: "get",
      url: url,
    });
  } catch {
    console.log("axios failed");
  }

  try {
    resData = resApi.data;
  } catch {
    console.log("no data");
  }

  try {
    content = await resData["Time Series (5min)"];
    if (content) {
      const keys = Object.keys(content);

      let sql = `insert IGNORE into intraday(symbol, datetime, open, high,low,close,volume) values (?)`;

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
      sql = `select max(datetime) as max from intraday where symbol = 'a'`;
      db.query(sql, function (err, rows, fields) {
        let max = rows[0].max;
        sql = `UPDATE company_info SET updatedAt_intraday = ? where symbol = "a";`;
        db.query(sql, max, function (err, rows, fields) {
          sql = `SELECT symbol from company_info where updatedAt_intraday<'${max}' OR updatedAt_intraday IS null`;
          db.query(sql, async function (err, rows, fields) {
            for (var i in rows) {
              let symbol = rows[i].symbol;
              await delayFunc.sleep(12050);
              count = rows.length - id;
              id += 1;
              console.log(symbol);

              if (symbol) {
                try {
                  url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=full&apikey=${API_KEY}`;
                } catch {
                  console.log("symbol or url not found");
                }
              }
              try {
                resApi = await axios({
                  method: "get",
                  url: url,
                });
              } catch {
                console.log("axios failed");
              }

              try {
                resData = resApi.data;
              } catch {
                console.log("no data");
              }

              let content = await resData["Time Series (5min)"];
              if (content) {
                const keys = Object.keys(content);

                let sql = `insert IGNORE into intraday(symbol, datetime, open, high,low,close,volume) values (?)`;

                console.log(
                  `${symbol} inserted into database : ${count} symbols left`
                );

                keys.forEach(function (key, index) {
                  const row = content[key];
                  const date = keys[index];
                  const open = parseFloat(row["1. open"]);
                  const high = parseFloat(row["2. high"]);
                  const low = parseFloat(row["3. low"]);
                  const close = parseFloat(row["4. close"]);
                  const volume = parseInt(row["5. volume"]);
                  const array = [symbol, date, open, high, low, close, volume];
                  db.query(sql, [array], function (err, rows, fields) {
                    if (err) console.log(err);
                  });
                });

                let sql2 = `UPDATE company_info SET updatedAt_intraday = '${max}' where symbol = ?`;
                db.query(sql2, symbol, function (err, rows, fields) {
                  if (err) console.log(err);
                });
              }
            }
          });
        });
      });
    }
  } catch {
    console.log("sql error");
  }
};

module.exports.insert_company_cap = async function getSymbol() {
  sql = `select symbol from company_info`;
  let data = [];
  db.query(sql, (err, result) => {
    for (var i in result) data = result[i].symbol;
  });
  console.log(data);
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

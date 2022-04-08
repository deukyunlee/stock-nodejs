const db = require("../../app.js");

module.exports.stock_daily_fully_get = (req, res, next) => {
  const symbol = req.params.symbol;
  const sql = `SELECT * from daily where symbol = ? and change_percent is not null`;
  db.query(sql, symbol, function (err, rows, fields) {
    // res.json(rows);
    try {
      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports.stock_daily_interval_get = (req, res, next) => {
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
    try {
      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports.stock_intraday_fully_get = (req, res, next) => {
  const symbol = req.params.symbol;
  const sql = `SELECT * from intraday where symbol= ?`;
  db.query(sql, symbol, function (err, rows, fields) {
    res.json(rows);
  });
};
module.exports.stock_company_fully_get = (req, res, next) => {
  const sql = `SELECT rank() over (order by cap DESC) as rank, symbol, name_en, name_kr,change_percent,img natural join daily`;
  db.query(sql, function (err, rows, fields) {
    res.json(rows);
  });
};

module.exports.stock_company_specific_get = (req, res, next) => {
  const symbol = req.params.symbol;
  const sql = `SELECT symbol, name_en, name_kr, desc_en,desc_kr,img,shareout from company_info where symbol = ?`;
  db.query(sql, symbol, function (err, rows, fields) {
    res.json(rows);
  });
};

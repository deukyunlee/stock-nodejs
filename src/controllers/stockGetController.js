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

// for daily
module.exports.stock_intraday_daily_get = (req, res, next) => {
  const symbol = req.params.symbol;
  const sql1 = `SELECT MAX(date(datetime)) as max_date from intraday where symbol = ?`;
  db.query(sql1, symbol, function (err, rows, fields) {
    const max_date = rows[0].max_date;
    const sql2 = `SELECT * from intraday where symbol ="${symbol}" and date(datetime)=?`;
    db.query(sql2, max_date, function (err, rows, fields) {
      res.json(rows);
    });
  });
};

// for weekly
module.exports.stock_intraday_weekly_get = (req, res, next) => {
  const symbol = req.params.symbol;
  const sql1 = `SELECT distinct date(datetime) as date from intraday where symbol = ? order by datetime desc limit 7`;
  db.query(sql1, symbol, function (err, rows, fields) {
    const start_date = rows[6].date;
    const end_date = rows[0].date;
    console.log(start_date);
    console.log(end_date);
<<<<<<< HEAD
    const sql2 = `select symbol, datetime, open, max(high) as high, min(low) as low, close, sum(volume) as volume from intraday where symbol = "aapl" and datetime between "${start_date}" and "${end_date}" group by date(datetime), extract(hour from datetime) order by datetime asc;`;
=======
    const sql2 = `select symbol, datetime, open, max(high) as high, min(low) as low, close, sum(volume) as volume from intraday where symbol = "aapl" and datetime between "${start_date}" and "${end_date}" group by date(datetime),floor (hour(datetime)/4) order by datetime asc;`;
>>>>>>> deukyun
    // const sql2 = `SELECT * from intraday where symbol ="${symbol}" and date(datetime)=?`;
    //select symbol, extract(hour from datetime)/4 as hour, open, max(high) as high, min(low) as low, close, sum(volume) as volume from intraday where symbol = "aapl" and datetime between "2022-01-01" and "2022-04-01" group by date(datetime), hour order by datetime asc;
    db.query(sql2, function (err, rows, fields) {
      res.json(rows);
    });
  });
};

module.exports.stock_intraday_monthly_get = (req, res, next) => {
  const symbol = req.params.symbol;
  const sql1 = `select * from daily where symbol = "aapl" order by date desc limit 30;`;
  db.query(sql1, symbol, function (err, rows, fields) {
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

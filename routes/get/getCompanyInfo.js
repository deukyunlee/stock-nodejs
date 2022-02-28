const router = require("express").Router();
const db = require("../app.js");

router.get("/list/:symbol", function (req, res) {
  const symbol = req.params.symbol;
  const sql = `SELECT * from company_info where symbol = ?`;
  db.query(sql, symbol, function (err, rows, fields) {
    res.json(rows);
  });
});

router.get("/full-data", function (req, res) {
  const sql = `SELECT rank() over (order by cap DESC) as number, symbol, name, description from company_info`;
  db.query(sql, function (err, rows, fields) {
    res.json(rows);
  });
});

module.exports = router;

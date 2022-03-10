const router = require("express").Router();
const db = require("../../app.js");

router.get("/list/:symbol", function (req, res) {
  const symbol = req.params.symbol;
  const sql = `SELECT * from company_info where symbol = ?`;
  db.query(sql, symbol, function (err, rows, fields) {
    res.json(rows);
  });
});

router.get("/full-data", function (req, res) {
  const sql = `SELECT rank() over (order by cap DESC) as rank, symbol, name_en, name_kr, desc_en, desc_kr from company_info`;
  db.query(sql, function (err, rows, fields) {
    res.json(rows);
  });
});

module.exports = router;

const router = require("express").Router();
const db = require("../../app.js");

router.get("/:symbol", function (req, res) {
  const symbol = req.params.symbol;
  const sql = `SELECT * from intraday where symbol= ?`;
  db.query(sql, symbol, function (err, rows, fields) {
    res.json(rows);
  });
});

module.exports = router;

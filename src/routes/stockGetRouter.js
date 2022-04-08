const router = require("express").Router();
const controller = require("../controllers/stockGetController");
const controller2 = require("../funcs/insertStockData");
router.get("/company/specific/:symbol", controller.stock_company_specific_get);

router.get("/company/full-data/", controller.stock_company_fully_get);

router.get(
  "/daily/specific/full-data/:symbol",
  controller.stock_daily_fully_get
);

router.get(
  "/daily/specific/interval/:symbol",
  controller.stock_daily_fully_get
);

router.get(
  "/intraday/specific/full-data/:symbol",
  controller.stock_company_fully_get
);

router.get("/daily", controller2.insert_company_cap);

module.exports = router;

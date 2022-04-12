const router = require("express").Router();
const controller = require("../controllers/stockGetController");
const controller2 = require("../controllers/companyInsertController");
router.get("/company/specific/:symbol", controller.stock_company_specific_get);

router.get("/company/full-data/", controller.stock_company_fully_get);

router.get(
  "/daily/specific/full-data/:symbol",
  controller.stock_daily_fully_get
);

router.get(
  "/daily/specific/interval/:symbol",
  controller.stock_daily_interval_get
);

router.get(
  "/company/specific/full-data/:symbol",
  controller.stock_company_fully_get
);

router.get(
  "/intraday/specific/for-daily/:symbol",
  controller.stock_intraday_daily_get
);

router.get(
  "/intraday/specific/for-weekly/:symbol",
  controller.stock_intraday_weekly_get
);

router.get(
  "/intraday/specific/for-monthly/:symbol",
  controller.stock_daily_monthly_get
);

router.get(
  "/intraday/specific/for-3monthly/:symbol",
  controller.stock_daily_monthly_3_get
);
router.get("/daily", controller2.insert_company_cap);

module.exports = router;

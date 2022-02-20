const fs = require("fs");
const router = require("express").Router();
const crawling = require("./crawling");
const path = require("path");

router.get("/", function (req, res, next) {
  async function crawl() {
    await crawling.crawlSymbol();

    const data2 = fs.readFileSync(path.resolve(__dirname, "../symbol.json"));
    const test_json = JSON.parse(data2);
    res.json(test_json);
  }
  crawl();
});

module.exports = router;

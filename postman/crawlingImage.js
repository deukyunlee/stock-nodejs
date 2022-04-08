const puppeteer = require("puppeteer");
const delay = require("../delayFuncs");
const cheerio = require("cheerio");
const fs = require("fs");
var List = [];
puppeteer
  .launch({
    headless: false,
  })
  .then(async (browser) => {
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://kr.tradingview.com/symbols/SPX/components/", {
      waitUntil: "networkidle2",
    });

    page.waitForNavigation();

    while (true) {
      try {
        await page.waitForSelector("button");
        await page.click(".loadButton-59hnCnPW");
      } catch {
        break;
      }
    }

    const content = await page.content();

    const $ = cheerio.load(content);
    const lists = $(".table-8MglMQUg > tbody > tr");
    lists.each(function (i, result) {
      List[i] = {
        href:
          "https://kr.tradingview.com" +
          $(this).find("td:nth-of-type(1)").find("a").attr("href"),
      };
      console.log(List[i].href);
      fs.appendFileSync("test.txt", '"' + List[i].href + '"' + "," + "\n");
      // console.log(List[i].symbol);
    });

    const data = List.filter((n) => n.href);
  });

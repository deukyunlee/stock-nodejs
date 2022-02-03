const puppeteer = require("puppeteer") 
// most of funcs, tools that puppeteer gives us are async or promise so we need to await them before we move to somethin' else
// we can only use await in the asynchoronous function

async function start() {
  const browser = await puppeteer.launch() // we are launching the browser and we don't know how long it will take so we are awaiting
  //once that are completed
  const page = await browser.newPage()
  await page.goto("https://en.wikipedia.org/wiki/JavaScript")
  await page.screenshot({ path: "amazing2.png", fullPage: true }) // you can elid fullPage option if you want
  await page.close()
}

start()

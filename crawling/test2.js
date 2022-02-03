const puppeteer = require("puppeteer")
// most of funcs, tools that puppeteer gives us are async or promise so we need to await them before we move to somethin' else
// we can only use await in the asynchoronous function

const fs = require("fs/promises") // so that don't have to write messy callback code it will just give us promise
const cron = require("node-cron")
async function start() {
  const browser = await puppeteer.launch() // we are launching the browser and we don't know how long it will take so we are awaiting
  //once that are completed
  const page = await browser.newPage()
  await page.goto("https://learnwebcode.github.io/practice-requests/")

  // whatever we return will be saved in names variable
  const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".info strong")).map((x) => x.textContent) // array from : true array, x means current strong tag that we loop to
  })
  await fs.writeFile("names.txt", names.join("\r\n")) // join means glue together

  await page.click("#clickme") // simulates click event
  const clickedData = await page.$eval("#data", (el) => el.textContent)
  console.log(clickedData)

  const photos = await page.$$eval("img", (imgs) => {
    return imgs.map((x) => x.src) // src gives full web address for that image
  })
  for (const photo of photos) {
    const imagepage = await page.goto(photo)
    await fs.writeFile(photo.split("/").pop(), await imagepage.buffer()) // pop: very final component in the new array
  }
  //$$ : selecting multiple elements instead of array.from
  await browser.close()
}

cron.schedule("*/5 * * * * *", start)

start()

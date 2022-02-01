const request = require("request")
const cheerio = require("cheerio")

function crawlSymbols() {
  var List = [] //list to store symbols of company
  request("https://markets.businessinsider.com/index/market-capitalization/nasdaq_100", (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)
      const $results = $(".table-responsive table tbody").children("tr").children("td").children("span")
      $results.each(function (i, result) {
        List[i] = {
          title: $(this).find("a").text(),
        }
      })
      const data = List.filter((n) => n.title)
      console.log(data)
      return data
      // console.log($.text())
    }
  })
}

async function getSymbols() {
  var data = await crawlSymbols()
  console.log(data)
}

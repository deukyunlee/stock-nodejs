const router = require("express").Router();
const algoliasearch = require("algoliasearch");
const dotenv = require("dotenv");
const db = require("../app.js");

dotenv.config();
//알고리아, 서버 데이터 유지 아이콘. . 이미지url.. 서버는 바뀌었는데 알고리아는 안바뀌는 일 일어나지않게 
// Algolia client credentials
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;


/* search 기능
  1. symbol
  2. 한글 (- 초성도 가능하게? )- 안해
  3. 영어

  반환하는 것 : {symbol, name_kr, name_en, img}
*/


//keyword로 search
async function searchdata(endpoint, method) {
  try {
    // Initialize the client
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
    // Initialize an index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    index.setSettings({
      queryLanguages: ['ko', 'en'],
      removeStopWords: true,
      ignorePlurals: true
    }).wait();

    if (method === "symbol") {
      res = await index.search(endpoint, {
        restrictSearchableAttributes: [
          'symbol'
        ],
        attributesToRetrieve : 'symbol'
      }); 
      
    }
    else if (method === "kr") {
      res = await index.search(endpoint, {
        restrictSearchableAttributes: [
          'kr_name'
        ],
        attributesToRetrieve : 'symbol'
      }); 
    }
    else if (method === "en") {
      res = await index.search(endpoint, {
        restrictSearchableAttributes: [
          'name'
        ],
        attributesToRetrieve : 'symbol'
      }); 
    }

    //console.log(res);
    console.log(res.hits); //콘솔로 확인

    return res.hits;
  
  } catch (error) {
    console.log(error);
  }
};

// /search/:method/:keyword
/*  method
  1. symbol
  2. kr
  3. en
*/
router.get("/:method/:keyword", function (req, res) {
  const method = req.params.method;
  const keyword = req.params.keyword;
  let symbols = [];
  let sql = "SELECT symbol, name, kr_name, objectID, img FROM company_info where symbol in("; //objectID 대신 img로 바꾸기! //img추가(0406)
  searchdata(keyword, method).then((result) => {
    //res.json(result); //알고리아 검색결과
    if (! result.length) {
      console.log("검색결과없음");
      res.send("검색결과없음");
      return;
    }
    result.forEach( (res) => {
      let onesymbol = "'"+res["symbol"]+"'";
      symbols.push(onesymbol);
    })
    sql += symbols.toString();
    sql += ") order by objectID;"
    // console.log(sql);


    db.query(sql, function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
      // console.log(rows);
    });

  });
})


module.exports = router;

const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  dbhost: process.env.DBHOST,
  dbname: process.env.DBNAME,
  dbport: process.env.DBPORT,
  dbuser: process.env.DBUSER,
  dbpassword: process.env.DBPASSWORD,
  alphavantage: process.env.ALPHAVANTAGEAPI,
  kakaorest: process.env.KAKAORESTAPI,
};

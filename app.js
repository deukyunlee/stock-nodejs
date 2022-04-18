const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
const mysql = require("mysql");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const config = require("./src/config/index");
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: "3.0.2",
    info: {
      title: "swagger-example API 문서",
      version: "1.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./api-doc/**/*.yaml"],
});

const db = mysql.createConnection({
  host: config.dbhost,
  user: config.dbuser,
  password: config.dbpassword,
  database: config.dbname,
  port: config.dbport,
  multipleStatements: true,
  dateStrings: "date",
  //socketPath: socket_path,
});

setInterval(function () {
  db.query("SELECT 1");
}, 5000);

module.exports = db;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*GET*/
// const searchData = require("./routes/get/searchData");
// const getDailyData = require("./routes/get/getDailyData");
// const getIntradayData = require("./routes/get/getIntradayData");
// const getCompanyInfo = require("./routes/get/getCompanyInfo");
// const kakaoAuth = require("./routes/kakao/auth");
// const cursorPaging = require("./routes/get/cursorPaging");

// app.use("/searchData", searchData);
// app.use("/daily", getDailyData);
// app.use("/intraday", getIntradayData);
// app.use("/company-info", getCompanyInfo);
// app.use("/cursorPaging", cursorPaging);

/*POST*/
// const postCompanyInfo = require("./routes/post/postCompanyInfo");
// const postDailyData = require("./routes/post/postDailyData");
// const postIntradayData = require("./routes/post/postIntradayData");
// const postImage = require("./routes/post/postImage");

// app.use("/post-daily", postDailyData);
// app.use("/post-company-info", postCompanyInfo);
// app.use("/post-intraday", postIntradayData);
// app.use("/post-image", postImage);
// app.use("/", function (req, res) {
//   res.json("hi");
// });

const stock_get = require("./src/routes/stockGetRouter");

app.use("/stock", stock_get);
app.use("/", function (req, res) {
  res.json("homepage");
});
/* AUTH | Swagger */
// app.use("/auth", kakaoAuth);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(`error status: ${err.status}`);
  // render the error page
  res.status(err.status || 500).json({ err: err.stack });
  res.render("error");
});

app.listen(process.env.PORT || 8080);
module.exports = app;

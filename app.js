const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
var app = express();
// const stockCron = require("./routes/stock2")
// stockCron
// view engine setup
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

require("dotenv").config();

const dbHost = process.env.DBHOST;
const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASSWORD;
const dbName = process.env.DBNAME;
const dbPort = process.env.DBPORT;

const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
  multipleStatements: true,
  //socketPath: socket_path,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("DB connected successfully");
});

module.exports = db;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const searchData = require("./routes/searchData");
const getDailyData = require("./routes/getDailyData");
const getIntradayData = require("./routes/getIntradayData");
const getCompanyInfo = require("./routes/getCompanyInfo");
const kakaoAuth = require("./routes/kakao/auth");
const realtime = require("./routes/realtimeData");
const cursorPaging = require("./routes/cursorPaging");
app.use("/searchData", searchData);
app.use("/daily", getDailyData);
app.use("/intraday", getIntradayData);
app.use("/company-info", getCompanyInfo);
app.use("/auth", kakaoAuth);
app.use("/realtime", realtime);
app.use("/cursorPaging", cursorPaging);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

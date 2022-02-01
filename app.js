var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fs = require("fs");
const mysql = require("mysql");
var bodyparser = require("body-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var app = express();
// const stockCron = require("./routes/stock2")
// stockCron
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root", // e.g. 'my-db-user'
  password: "111111", // e.g. 'my-db-password'
  database: "capstone", // e.g. 'my-database'
  port: "3306",
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

app.get("/symbol", function (req, res, next) {
  fs.readFile("./symbol.json", function (err, data) {
    var test_json = JSON.parse(data);
    res.json(test_json);
  });
});
app.get("/temp", function (req, res, next) {
  fs.readFile("./temporary.json", function (err, data) {
    var test_json = JSON.parse(data);
    res.json(test_json);
  });
});
app.get("/tsla", function (req, res, next) {
  fs.readFile("./tsla.json", function (err, data) {
    var test_json = JSON.parse(data);
    res.json(test_json);
  });
});
const stock2 = require("./routes/stock2");
app.use("/stock2", stock2);
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

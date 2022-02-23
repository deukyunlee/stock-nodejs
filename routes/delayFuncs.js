const delay = function () {
  const randomDelay = Math.floor(Math.random() * 4) * 100;
  return new Promise((resolve) => setTimeout(resolve, randomDelay));
};

const sleep = function (ms, symbol) {
  // console.log("sleep test");
  return new Promise((r) => setTimeout(r, ms));
};
const tt = function (symbol) {
  return new Promise((r) => console.log(symbol));
};
module.exports = {
  delay,
  sleep,
};

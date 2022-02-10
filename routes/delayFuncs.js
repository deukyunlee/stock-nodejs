const delay = function () {
  const randomDelay = Math.floor(Math.random() * 4) * 100;
  return new Promise((resolve) => setTimeout(resolve, randomDelay));
};

const sleep = function (ms) {
  return new Promise((r) => setTimeout(r, ms));
};

module.exports = {
  delay,
  sleep,
};

const router = require("express").Router();
const db = require("../../app.js");
const axios = require("axios");
const delayFunc = require("../delayFuncs");
const API_KEY = process.env.ALPHAVANTAGEAPI;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const user = {
  uploadProfile: async (req, res, err) => {
    console.log("confirmed");

    const image = req.file.path;

    console.log(req.file);
    if (image === undefined) {
      return res.status(400).send(util.fail(400, "이미지 존재하지 않음"));
    }
    res.status(200).send(util.success(200, "요청 성공 ", image));
  },
};

module.exports = user;

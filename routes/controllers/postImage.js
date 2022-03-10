const router = require("express").Router();
const db = require("../../app.js");
const axios = require("axios");
const delayFunc = require("../delayFuncs");
const API_KEY = process.env.ALPHAVANTAGEAPI;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({ storage });

//wedul.site/581 [wedul]
// fs.readdir("./uploads", (err) => {
//   if (err) fs.mkdirSync("./uploads");
// });

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, "uploads/");
//     },
//     filename(req, file, cb) {
//       const ext = path.extname(file.originalname);
//       cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });
// router.post("/", function (req, res, next) {
//   console.log(req.file);
//   //   res.json({ url: `/${req.file.filename}` });
// });

// const upload = multer({
//   dest: "uploads/",
// });
// console.log(upload.dest);
// const Usercontroller = require("../controllers/user");
// router.post("/profile", upload.single("image"), Usercontroller.uploadProfile);

router.post("/test", upload.single("productImg"), async (req, res, next) => {
  try {
    console.log(req.file);
    res.json(req.body);
  } catch (e) {
    next(e);
  }
});

router.post(
  "/multiple",
  upload.array("productImg", 4),
  async (req, res, next) => {
    let url = new Array();
    for (var i in req.files.length) {
      url.push(`/productImg/${req.files[i].filename}`);
      console.log(url);
    }
  }
);
module.exports = router;

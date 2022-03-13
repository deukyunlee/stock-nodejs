const express = require("express");
const router = express.Router();
const db = require("../../app.js");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const apiKey = process.env.KAKAORESTAPI;
// console.log(apiKey);

passport.use(
  "kakao",
  new KakaoStrategy(
    {
      clientID: apiKey,
      callbackURL: "/auth/kakao/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      const provider = profile.provider;
      const email = profile._json.kakao_account.email;
      const data = [provider, refreshToken, email];
      db.query(
        "select refresh_token from user where email = ?",
        email,
        (err, rows, fields) => {
          if (rows[0]) {
            console.log(refreshToken);
            console.log(rows[0].refresh_token == refreshToken);
            if (rows[0].refresh_token == refreshToken) {
              console.log("exists");
            }
          } else {
            db.query(
              "insert into user(provider, refresh_token, email) values (?)",
              [data],
              (err, rows) => {
                if (err) console.log(err);
              }
            );
          }
        }
      );
    }
  )
);

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    res.redirect("/auth");
  }
);

module.exports = router;

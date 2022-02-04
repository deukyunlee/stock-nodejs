const express = require("express");
const router = express.Router();
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
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
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

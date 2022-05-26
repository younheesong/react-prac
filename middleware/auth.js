const { User } = require("../models/User.js");

let auth = (req, res, next) => {
  // auth 처리
  //client cookie에서 토큰 가져오기
  //토큰을 복호화하여 유저 찾기
  //유저가 있으면 인증 o
  //유저가 없으면 인증 no
  let token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };

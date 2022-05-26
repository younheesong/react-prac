const express = require("express");
const app = express();
const port = 3000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/key");
const cookieParser = require("cookie-parser");
//application.x-www0form-! 분석가능하게 해 줌
app.use(bodyParser.urlencoded({ extended: true }));
//json 파일 분석 하게 해줌
app.use(bodyParser.json());
app.use(cookieParser());
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("connect well"))
  .catch((err) => console.log(err));
//
// mongodb+srv://younheesong:<password>@basic.zrmmot3.mongodb.net/?retryWrites=true&w=majority
app.get("/", (req, res) => {
  res.send("Hello World!!");
});
app.post("/register", (req, res) => {
  // register 시, 필요한 정보를 client 받으면 db에 저장
  const user = new User(req.body);
  user.save((err, userInfo) => {
    console.log(userInfo);
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.post("/login", (req, res) => {
  // 요청된 이메일을 db에서 있는지 체크
  // 이메일이 있으면, 비밀번호 동일 체크
  //비밀번호 동일시 token 생성

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        msg: "not find user email",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          msg: "not match user password",
        });
      }

      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        // token을 response에 보냄
        return res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

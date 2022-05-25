const express = require("express");
const app = express();
const port = 3000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/key");

//application.x-www0form-! 분석가능하게 해줌
app.use(bodyParser.urlencoded({ extended: true }));
//json 파일 분석 하게 해줌
app.use(bodyParser.json());

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
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

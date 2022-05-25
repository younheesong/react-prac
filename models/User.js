const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //salt 가 몇글자인지

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // space 없애줌
    maxlength: 50,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  // password 를 암호화 시키기
  // 1. salt 생성
  // 2. salt를 이용해 암호화 하기
  const user = this; // this는 save 시킬 data

  if (user.isModified("password")) {
    //password가 변경될때만 아래 암호화 실행

    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return next(err);
        user.password = hash; // 기존 순순 password가 아닌 암호화된 password 를 넣어둠.
        next();
      });
    });
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = { User };

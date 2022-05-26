const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //salt 가 몇글자인지
const jwt = require("jsonwebtoken");

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
  let user = this; // this는 save 시킬 data

  if (user.isModified("password")) {
    //password가 변경될때만 아래 암호화 실행

    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return next(err);
        console.log(hash);
        user.password = hash; // 기존 순순 password가 아닌 암호화된 password 를 넣어둠.
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 와 db에 있는 암호화된 비밀번호를 비교
  const user = this;
  console.log(plainPassword, this.password);
  bcrypt.compare(plainPassword, user.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  //jsonwebtoken 이용해서 token 생성
  const user = this;
  user.token = jwt.sign(user._id, "secretToken"); //user_id와 'secretToken'을 통해 토큰 만듦

  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.methods.findByToken = function (token, cb) {
  var user = this;
  jwt.verify(token, "secretToken", function (err, decoded) {
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };

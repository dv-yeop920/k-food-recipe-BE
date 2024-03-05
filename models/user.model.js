//user model 만들기
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//user 정보 설정하기
const userSchema = mongoose.Schema({
  //사용자 이름
  name: {
    type: String,
    required: true,
    maxlength: 50, //최대 글자수
    minlength: 1,
  },
  //id
  id: {
    type: String,
    required: true,
    maxlength: 15,
    minlength: 5,
    unique: true,
  },
  //비번
  password: {
    type: String,
    required: true,
    maxlength: 1000,
    minlength: 8, //최소 글자수
  },
  //이메일
  email: {
    type: String,
    required: true,
    trim: true, //이메일을 입력할 때 띄어쓰기가 있으면 띄어쓴 부분 없애줌
    unique: true, //이메일 중복 안되게 설정
  },
  //role의 숫자여부에 따라 관리자인지 일반 회원인지 판별 할 수 있게 설정
  role: {
    type: Number,
    default: 0,
  },
  //유효성 검사 하기 위한 토큰
  token: {
    type: String,
  },
  //토큰 유효 기간
  tokenExp: {
    type: Number,
  },
});

//index에서 login에 쓸 함수 스키마 제작?
userSchema.methods.comparePassword = function (
  plainPassword,
  callBack
) {
  //유저가 입력한 plainpassword 와 db의 password가 일치한지 palin을 암호화해서 비교
  bcrypt.compare(
    plainPassword,
    this.password,
    (error, isMatch) => {
      if (error) return callBack(error);
      callBack(null, isMatch);
    }
  );
};

//accessToken 생성함수
userSchema.methods.generateAccessToken = function (
  callBack
) {
  const user = this;
  //accessToken 생성
  try {
    const accessToken = jwt.sign(
      user._id.toJSON(),
      "accessToken"
    );
    callBack(null, accessToken);
  } catch (error) {
    console.error("AccessToken생성에러: ", error);
    callBack(error);
  }
};

//리프레시 토큰 생성 함수
userSchema.methods.generateRefreshToken = function (
  callBack
) {
  const user = this;
  //jwt로 토큰 생성하는 함수
  const refreshToken = jwt.sign(
    user._id.toJSON(),
    "refreshToken"
  );
  user.token = refreshToken;
  user
    .save()
    .then(result => {
      callBack(null, result);
    })
    .catch(error => {
      callBack(error);
    });
};
//토큰을 복호화하고 유저를 찾는 함수
userSchema.statics.findByAccessToken = function (
  token,
  callBack
) {
  const user = this;
  //token 을 decode (복호화) 한다
  jwt.verify(
    token,
    "accessToken",
    function (error, decode) {
      //decode = user._id
      //decode를 이용해서 유저를 찾은 다음 클라이언트에서 가져온 토큰과 db의 토큰이 일치하는지 비교
      user
        .findOne({
          _id: decode,
        })
        .then(docs => {
          callBack(null, docs);
        })
        .catch(error => {
          return callBack(error);
        });
    }
  );
};

userSchema.statics.findByRefreshToken = function (
  token,
  callBack
) {
  const user = this;
  //token 을 decode (복호화) 한다
  jwt.verify(
    token,
    "refreshToken",
    function (error, decode) {
      console.log(decode);
      //decode = user._id
      //decode를 이용해서 유저를 찾은 다음 클라이언트에서 가져온 토큰과 db의 토큰이 일치하는지 비교
      user
        .findOne({
          _id: decode,
        })
        .then(docs => {
          callBack(null, docs);
        })
        .catch(error => {
          return callBack(error);
        });
    }
  );
};

//스키마에 pre 라는 mongoose 메소드로 save 되기 전에 암호화 시켜서 보내는 함수를 만든다.
//그러면 save 되기전에 암호화된다
userSchema.pre("save", function (next) {
  //이 this 는 schma를 가르킴
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (error, salt) => {
      //에러가 나면 save에 error를 보내준다.
      if (error) return next(error);
      //암호화된 비밀 번호를 보내준다
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

//스키마 작성 끝나면 모델안에 스키마 넣어주기
const User = mongoose.model("User", userSchema);

//다른 곳에서도 쓸 수 있게 모듈화 해줌
module.exports = { User };

const { User } = require("../models/user.model");

exports.signUp = async (req, res) => {
  //인스턴스 객체 생성 후 클라이언트 요청을 담는다
  const user = new User(req.body);
  //정보를 db에 보내준다. 이때 , 성공하거나 에러가 나면 메세지를 json 형식으로 보내준다.
  //mongoDB 메서드, user모델에 저장
  //mongoose 6버전 부터는 save 에 콜백함수를 지원하지 않아 아래와 같이 코드 작성한다

  await User.find({
    $or: [{ id: user.id }, { email: user.email }],
  })
    .then(docs => {
      if (docs[0].email === user.email) {
        return res.json({
          success: false,
          messsage: "해당 이메일은 이미 사용중 입니다",
        });
      }
      if (docs[0].id === user.id) {
        return res.json({
          success: false,
          messsage: "해당 아이디는 이미 사용중 입니다",
        });
      }
    })
    .catch(() => {
      user
        .save()
        .then(() => {
          res.status(200).json({
            success: true,
            messsage:
              "회원가입을 성공적으로 하셨습니다. 로그인 하여 서비스를 이용해 보세요!",
          });
        })
        .catch(error => {
          console.log(docs);
          return res.json({
            success: false,
            messsage: "입력한 값이 틀리지 않았는지 다시 확인해 주세요",
            error,
          });
        });
    });
};

exports.signIn = async (req, res) => {
  // 요청된 아이디와 일치 하는 데이터베이스 찾기
  await User.findOne({ id: req.body.id })
    .then(docs => {
      if (!docs) {
        return res.json({
          isLogin: false,
          messsage: "해당 아이디로 가입된 회원이 없습니다.",
        });
      }
      //비번 비교
      docs.comparePassword(req.body.password, (error, isMatch) => {
        const currentTime = new Date();
        const oneHourInMilliseconds = 1000 * 60 * 100;
        const expirationTime = new Date(
          currentTime.getTime() + oneHourInMilliseconds
        );

        // Password가 일치하다면 리프레시 , 엑세스 토큰 생성
        if (isMatch) {
          docs.generateRefreshToken((err, user) => {
            if (err) {
              res.status(400).send(error);
            }

            docs.generateAccessToken((err, accessToken) => {
              if (err) {
                res.status(400).send(error);
              }

              const cookieOptions = {
                domain: "localhost",
                path: "/",
                expires: expirationTime,
                httpOnly: true,
                sameSite: "strict",
              };

              // 리프레시토큰을 브라우저에 저장
              res
                .cookie("user", user.token, cookieOptions)
                .status(200)
                .json({
                  isLogin: true,
                  messsage: `안녕하세요 ${user.name}님!`,
                  userId: user.id,
                  userName: user.name,
                  userEmail: user.email,
                  //엑세스는 응답 값으로 전달
                  accessToken: accessToken,
                });
            });
          });
        } else {
          return res.json({
            isLogin: false,
            messsage: "비밀번호가 틀렸습니다.",
          });
        }
      });
    })
    .catch(error => {
      return res.status(400).send(error);
    });
};

exports.signOut = async (req, res) => {
  //db에서 정보를 찾아서 업데이트 시켜서 토큰을 삭제 한다
  await User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    .then(docs => {
      if (docs) {
        res.clearCookie("user");
        res.status(200).send({
          logoutSuccess: true,
          messsage: "로그아웃 되었습니다",
        });
      } else {
        return res.json({
          logoutSuccess: false,
          messsage: "로그아웃 실패",
        });
      }
    })
    .catch(error => {
      return res.status(400).send(error);
    });
};

exports.authorization = (req, res) => {
  //이코드가 실행 되는것은 미들웨어인 auth가 성공적으로 실행 됐다는뜻
  //성공적으로 됐다면 유저 정보를 클라이언트로 보내줌
  res.status(200).json({
    _id: req.user._id,
    userId: req.user.id,
    userName: req.user.name,
    userEmail: req.user.email,
    isAuth: true,
    accessToken: req.accessToken,
    //어드민 유저 설정
    //isAdmin: req.user.role === 0 ? false : true,
    //role: req.user.role,
  });
};

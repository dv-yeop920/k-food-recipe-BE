const { User } = require("../models/user.model.js");

const auth = (req, res, next) => {
  //인증처맇 하는 공간
  //클라이언트 쿠키에서 토큰을 가져온다
  const refreshToken = req.cookies.user;
  const authHeader = req.headers.authorization;

  if (!authHeader && !refreshToken) {
    return res.status(401).json({
      error: "로그인이 필요한 서비스입니다.",
    });
  }

  if (authHeader) {
    //헤더 분해
    const parts = authHeader.split(" ");

    if (!parts.length === 2) {
      return res.status(401).json({ error: "Token error" });
    }
    //헤더 분해
    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res
        .status(401)
        .json({ error: "Token malformatted" });
    }

    // 이제 token에 "Bearer"를 제거한 accessToken이 저장
    const accessToken = token;
    console.log(accessToken);

    //토큰을 복호화 한 후에 유저를 찾는다
    User.findByAccessToken(
      accessToken,
      function (error, user) {
        if (error) throw error;

        if (user) {
          req.accessToken = accessToken;
          req.user = user;
          next();
        } else {
          //user 정보가 없다면 false
          return res.json({
            isAuth: false,
            error: true,
            message: "토큰 없음",
          });
        }
      }
    );
    return;
  }

  if (refreshToken) {
    User.findByRefreshToken(
      refreshToken,
      function (error, user) {
        if (error) throw error;

        if (user) {
          user.generateAccessToken(
            (error, newAccessToken) => {
              if (error) throw error;
              req.accessToken = newAccessToken;
              req.user = user;
              next();
            }
          );
        }
      }
    );
  }
};

module.exports = { auth };

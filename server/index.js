const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database.js");

const app = express();
//env 파일 값을 읽을 수 있게 해주는 모듈
require("dotenv").config({ path: __dirname + "/.env" });
//DB 연결
connectDB();

const PORT = process.env.PORT_NUMBER;
const ORIGIN_PORT = process.env.ORIGIN_PORT;

//클라이언트의 req 를 json 형태로 해석 하도록 도와줌
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ORIGIN_PORT,
    credentials: true,
  })
);

app.listen(PORT, (req, res) => {
  console.log("hello world");
});

app.use("/api/users", require("./routes/user.route.js"));
app.use("/api/posts", require("./routes/post.route.js"));
app.use(
  "/api/posts/comment",
  require("./routes/comment.route.js")
);
app.use("/api", require("./routes/recipe.route.js"));

//const data = [];

//Recipe.insertMany(data)
//.then(() => console.log("데이터 삽입 성공"))
//.catch(error => console.log(error));

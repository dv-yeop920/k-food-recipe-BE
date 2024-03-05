const {
  getCommentList,
  registerComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller.js");

const express = require("express");
const router = express.Router();

router.get("/getCommentList", getCommentList);
router.post("/register", registerComment);
router.put("/update", updateComment);
router.post("/delete", deleteComment);

module.exports = router;

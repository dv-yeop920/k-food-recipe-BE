const {
  getPostList,
  getPost,
  registerPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller.js");

const express = require("express");
const router = express.Router();

router.get("/getPostList", getPostList);
router.get("/getPost", getPost);
router.post("/register", registerPost);
router.put("/update", updatePost);
router.post("/delete", deletePost);

module.exports = router;

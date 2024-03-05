const {
  signUp,
  signIn,
  signOut,
  authorization,
} = require("../controllers/user.controller.js");

const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/signOut", auth, signOut);
router.get("/auth", auth, authorization);

module.exports = router;

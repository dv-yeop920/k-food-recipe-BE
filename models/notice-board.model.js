const mongoose = require("mongoose");

const noticeBoardSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("Post", noticeBoardSchema);

module.exports = { Post };

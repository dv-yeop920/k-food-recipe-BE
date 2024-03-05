const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  // 댓글 쓰는 게시물 아이디
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  id: {
    type: String,
    required: true,
    unique: true,
    ref: "User",
  },
  content: {
    type: String,
    maxlength: 1000,
    required: true,
  },
  // 대댓글 구현시 부모 댓글이 무엇인지
  responseTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };

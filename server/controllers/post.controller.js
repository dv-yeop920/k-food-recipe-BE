const { Post } = require("../models/notice-board.model");
const { Comment } = require("../models/comment.model");

exports.getPostList = async (req, res) => {
  const pageNumber = parseInt(req.query.page) - 1;
  const postPerPage = 5;

  const searchValue = req.query.search;

  //NOTE - 정규식 검사 해서 검색어가 특수문자가 들어가 있어도 검색 되도록
  const RegexValue = text => {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const RegexSearchValue = RegexValue(searchValue);

  let postList;
  let totalPostLength;

  try {
    if (searchValue === "null") {
      postList = await Post.find()
        .skip(pageNumber * postPerPage)
        .limit(postPerPage)
        .sort({ createdAt: -1 });

      totalPostLength = await Post.countDocuments();
    } else {
      postList = await Post.find({
        title: {
          $regex: RegexSearchValue,
          $options: "i",
        },
      })
        .skip(pageNumber * postPerPage)
        .limit(postPerPage)
        .sort({ createdAt: -1 });

      totalPostLength = await Post.countDocuments({
        title: { $regex: RegexSearchValue, $options: "i" },
      });
    }

    const modifiedPosts = postList.map(post => {
      const parts = post.id.split("_");
      const userId = parts[0];

      return {
        ...post.toObject(),
        id: userId,
      };
    });

    res.json({
      totalPostLength: totalPostLength,
      postList: modifiedPosts,
    });
  } catch (error) {
    res.json({
      messsage: "게시판 조회 실패했습니다",
    });
  }
};

exports.getPost = async (req, res) => {
  const postId = req.query.id;

  try {
    const post = await Post.findOne({
      _id: postId,
    });

    if (post) {
      res.json({
        post: post,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.registerPost = async (req, res) => {
  try {
    const post = {
      id: req.body.id + "_" + Date.now(),
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    };

    const posts = new Post(post);

    await posts.save();

    res.json({
      success: true,
      messsage: "게시물이 등록 되었습니다",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      messsage: "게시물 등록 실패했습니다",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    await Post.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          image: req.body.image,
        },
      }
    );

    res.json({
      updateSuccess: true,
      messsage: "업데이트 되었습니다",
    });
  } catch (error) {
    console.log(error);

    res.json({
      updateSuccess: false,
      messsage: "업데이트 실패했습니다",
    });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.body.postId;

  try {
    await Post.findOneAndDelete({
      _id: postId,
    });

    const result = await Comment.deleteMany({
      postId: postId,
    });

    if (result !== null) {
      res.json({
        messsage: "삭제 되었습니다",
      });
    } else {
      throw new Error("error");
    }
  } catch (error) {
    res.json({
      deleteSuccess: false,
      messsage: "삭제 실패했습니다",
    });
  }
};

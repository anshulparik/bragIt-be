const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const { createError } = require("../../errors/Error");

const createComment = async (req, res, next) => {
  try {
    const postId = req?.params?.postId;
    const user = req?.body?.user;

    if (!postId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }

    const foundPost = await Post.findOne({ _id: postId });
    if (!foundPost) {
      const err = createError(404, "Post not found!");
      next(err);
      return;
    }

    const foundUser = await User.findOne({ _id: user });
    if (!foundUser) {
      const err = createError(404, "User not found!");
      next(err);
      return;
    }

    const comment = await Comment.create({ ...req?.body, post: postId });
    res.status(201).send(comment);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const commentId = req?.params?.commentId;
    const { text } = req?.body;

    if (!commentId) {
      const err = createError(400, "CommentId is required!");
      next(err);
      return;
    }

    const foundComment = await Comment.findOne({ _id: commentId });
    if (!foundComment) {
      const err = createError(404, "Comment not found!");
      next(err);
      return;
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { ...(text && { text }) },
      { new: true }
    );

    res.status(200).send(updatedComment);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

module.exports = {
  createComment,
  updateComment,
};

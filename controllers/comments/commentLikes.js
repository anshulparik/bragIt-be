const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const { createError } = require("../../errors/Error");

const handleLike = async (req, res, next) => {
  try {
    const userId = req?.body?.userId;
    const { commentId } = req?.params;

    if (!commentId) {
      const err = createError(400, "CommentId is required!");
      next(err);
      return;
    }

    if (!userId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }

    const foundComment = await Comment.findOne({ _id: commentId });
    if (!foundComment) {
      const err = createError(404, "Comment not found!");
      next(err);
      return;
    }

    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      const err = createError(404, "User not found!");
      next(err);
      return;
    }

    const commentLikes = foundComment?.likes;
    const commentDislikes = foundComment?.dislikes;

    if (commentLikes?.includes(userId)) {
      const commentIndex = commentLikes?.findIndex(userId);
      if (commentIndex > -1) {
        commentLikes?.splice(commentIndex, 1);
      }
    } else if (commentDislikes?.includes(userId)) {
      const commentIndex = commentDislikes?.findIndex(userId);
      if (commentIndex > -1) {
        commentDislikes?.splice(commentIndex, 1);
      }
    } else {
      commentLikes = [...commentLikes, userId];
    }

    const updatedComment = Comment?.findByIdAndUpdate(
      foundComment?._id,
      {
        likes: commentLikes,
        dislikes: commentDislikes,
      },
      { new: true }
    );

    res.status(200).send(updatedComment);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

const handleDislike = async (req, res, next) => {
  try {
    const userId = req?.body?.userId;
    const { commentId } = req?.params;

    if (!commentId) {
      const err = createError(400, "CommentId is required!");
      next(err);
      return;
    }

    if (!userId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }

    const foundComment = await Comment.findOne({ _id: commentId });
    if (!foundComment) {
      const err = createError(404, "Comment not found!");
      next(err);
      return;
    }

    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      const err = createError(404, "User not found!");
      next(err);
      return;
    }

    const commentLikes = foundComment?.likes;
    const commentDislikes = foundComment?.dislikes;

    if (commentLikes?.includes(userId)) {
      const commentIndex = commentLikes?.findIndex(userId);
      if (commentIndex > -1) {
        commentLikes?.splice(commentIndex, 1);
      }
    } else if (commentDislikes?.includes(userId)) {
      const commentIndex = commentDislikes?.findIndex(userId);
      if (commentIndex > -1) {
        commentDislikes?.splice(commentIndex, 1);
      }
    } else {
      commentDislikes = [...commentDislikes, userId];
    }

    const updatedComment = Comment?.findByIdAndUpdate(
      foundComment?._id,
      {
        likes: commentLikes,
        dislikes: commentDislikes,
      },
      { new: true }
    );

    res.status(200).send(updatedComment);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

module.exports = {
    handleLike,
    handleDislike
};

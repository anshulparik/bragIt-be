const User = require("../../models/User");
const Post = require("../../models/Post");

const { createError } = require("../../errors/Error");

const handleLike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }

    if (!postId) {
      const err = createError(400, "PostId is required!");
      next(err);
      return;
    }

    const foundProfile = await User.findOne({ _id: userId });
    if (!foundProfile) {
      const err = createError(404, "User doesn't exist!");
      next(err);
      return;
    }

    const foundPost = await Post.findOne({ _id: postId });
    if (!foundPost) {
      const err = createError(404, "Post doesn't exist!");
      next(err);
      return;
    }

    let postLikes = foundPost?.likes;
    let postDislikes = foundPost?.dislikes;

    if (postLikes?.includes(userId)) {
      const userIndex = postLikes?.indexOf(userId);
      if (userIndex > -1) {
        postLikes?.splice(userIndex, 1);
      }
    } else if (postDislikes?.includes(userId)) {
      const userIndex = postDislikes?.indexOf(userId);
      if (userIndex > -1) {
        postDislikes?.splice(userIndex, 1);
      }
    } else {
      postLikes = [...postLikes, userId];
    }

    const updatedPost = await Post?.findByIdAndUpdate(
      foundPost?._id,
      {
        likes: postLikes,
        dislikes: postDislikes,
      },
      {
        new: true,
      }
    );

    res.status(200).send(updatedPost);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

const handleDislike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }

    if (!postId) {
      const err = createError(400, "PostId is required!");
      next(err);
      return;
    }

    const foundProfile = await User.findOne({ _id: userId });
    if (!foundProfile) {
      const err = createError(404, "User doesn't exist!");
      next(err);
      return;
    }

    const foundPost = await Post.findOne({ _id: postId });
    if (!foundPost) {
      const err = createError(404, "Post doesn't exist!");
      next(err);
      return;
    }

    let postLikes = foundPost?.likes;
    let postDislikes = foundPost?.dislikes;

    if (postLikes?.includes(userId)) {
      const userIndex = postLikes?.indexOf(userId);
      if (userIndex > -1) {
        postLikes?.splice(userIndex, 1);
      }
    } else if (postDislikes?.includes(userId)) {
      const userIndex = postDislikes?.indexOf(userId);
      if (userIndex > -1) {
        postDislikes?.splice(userIndex, 1);
      }
    } else {
      postDislikes = [...postDislikes, userId];
    }

    const updatedPost = await Post?.findByIdAndUpdate(
      foundPost?._id,
      {
        likes: postLikes,
        dislikes: postDislikes,
      },
      {
        new: true,
      }
    );

    res.status(200).send(updatedPost);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

module.exports = {
  handleLike,
  handleDislike,
};

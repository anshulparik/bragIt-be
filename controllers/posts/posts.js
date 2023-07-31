const User = require("../../models/User");
const Post = require("../../models/Post");

const { handlePostUpload } = require("../../uploads/posts");
const { createError } = require("../../errors/Error");
const { ROLES } = require("../../utils/constant");

const createPost = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }

    const foundProfile = await User.findOne({ _id: userId });
    if (!foundProfile) {
      const err = createError(404, "User doesn't exist!");
      next(err);
      return;
    }

    const { file } = await handlePostUpload(req, res);

    if (!file?.length) {
      const err = createError(400, "Please select an image!");
      next(err);
      return;
    }

    const posts = file?.map((file) => {
      return file?.filename;
    });

    const post = await Post.create({
      posts,
      user: userId,
    });

    res.status(201).send(post);
  } catch (error) {
    let err;
    if (typeof error === "string") {
      err = createError(400, error);
    } else {
      err = createError(500, error.message);
    }
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      const err = createError(400, "PostId is required!");
      next(err);
      return;
    }

    const foundPost = await Post.findOne({ _id: postId });
    if (!foundPost) {
      const err = createError(404, "Post doesn't exist!");
      next(err);
      return;
    }

    const { file } = await handlePostUpload(req, res);

    if (!file?.length) {
      const err = createError(400, "Please select an image!");
      next(err);
      return;
    }

    const posts = file?.map((file) => {
      return file?.filename;
    });

    const updatedPost = await Post.findByIdAndUpdate(
      foundPost?._id,
      { posts },
      { new: true }
    );

    res.status(200).send(updatedPost);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

const addPostDetails = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId, description, tags } = req.body;

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

    const updatedPost = await Post.findByIdAndUpdate(
      foundPost?._id,
      { description, tags },
      { new: true }
    );

    res.status(200).send(updatedPost);
  } catch (error) {}
};

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      const err = createError(400, "PostId is required!");
      next(err);
      return;
    }

    const foundPost = await Post.findOne({ _id: postId });
    if (!foundPost) {
      const err = createError(404, "Post doesn't exist!");
      next(err);
      return;
    }

    if (req?.user?.role === ROLES.USER) {
      if (foundPost?.user?.toString() === req?.user?.id) {
        await Post.findByIdAndDelete(postId);
      } else {
        const err = createError(401, "Unauthorized!");
        next(err);
        return;
      }
    } else {
      await Post.findByIdAndDelete(postId);
    }

    res.status(200).send("Post deleted successfully!");
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

module.exports = { createPost, updatePost, deletePost, addPostDetails };

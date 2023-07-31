const bcrypt = require("bcrypt");

const User = require("../../models/User");
const Profile = require("../../models/Profile");
const { createError } = require("../../errors/Error");
const { ROLES } = require("../../utils/constant");

const findAllUsers = async (_req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userId = req?.params?.userId;
    if (!userId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }

    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      const err = createError(404, "User not found!");
      next(err);
      return;
    }

    // hash password
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      foundUser?._id,
      {
        ...(email && { email }),
        ...(hashedPassword && { password: hashedPassword }),
      },
      { new: true }
    );

    res.status(200).send(updatedUser);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

const findUser = async (req, res, next) => {
  try {
    const userId = req?.params?.userId;
    if (!userId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }

    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      const err = createError(404, "User not found!");
      next(err);
      return;
    }

    res.status(200).send(foundUser);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};


// also delete its profile, posts, likes, comments.
const deleteUser = async (req, res, next) => {
  try {
    const userId = req?.params?.userId;
    if (!userId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }

    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      const err = createError(404, "User not found!");
      next(err);
      return;
    }

    if (req?.user?.role === ROLES.USER) {
      if (foundUser?._id?.toString() === req?.user?.id) {
        await User.findByIdAndDelete(userId);
        await Profile.findOneAndDelete({ user: userId });
      } else {
        const err = createError(401, "Unauthorized!");
        next(err);
        return;
      }
    } else {
      await User.findByIdAndDelete(userId);
      await Profile.findOneAndDelete({ user: userId });
    }

    await User.findByIdAndDelete(userId);
    await Profile.findOneAndDelete({ user: userId });

    res.status(201).send("User deleted successfully!");
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

module.exports = { findAllUsers, updateUser, findUser, deleteUser };

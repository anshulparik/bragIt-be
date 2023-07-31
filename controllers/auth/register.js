const bcrypt = require("bcrypt");

const User = require("../../models/User");
const Profile = require("../../models/Profile");
const { createError } = require("../../errors/Error");

const register = async (req, res, next) => {
  try {
    const { email, password, role, username } = req.body;
    if (!email || !password) {
      const err = createError(400, "Email and Password are required!");
      next(err);
      return;
    }

    if (!username) {
      const err = createError(400, "Username is required!");
      next(err);
      return;
    }

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      const err = createError(409, "Email already registerd!");
      next(err);
      return;
    }

    const foundProfile = await Profile.findOne({
      username: req?.body?.username,
    });
    if (foundProfile) {
      const err = createError(409, "Username already taken!");
      next(err);
      return;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    if (newUser?._id) {
      await Profile.create({ user: newUser?._id, username });
    }

    await newUser.save();

    res.status(201).send(newUser);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

module.exports = { register };

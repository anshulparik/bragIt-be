const User = require("../../models/User");
const { createError } = require("../../errors/Error");

const logout = async (req, res, next) => {
  try {
    const storedRefreshToken = req?.cookies?.tokens?.refreshToken;
    if (!storedRefreshToken) {
      res.clearCookie("tokens", {
        httpOnly: true,
        // secure: true,
        // sameSite: "None",
        // maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).send("Logged Out!");
    }

    // Token check in DB
    const foundUser = await User.findOne({ refreshToken: storedRefreshToken });
    if (!foundUser) {
      res.clearCookie("tokens", {
        httpOnly: true,
        // secure: true,
        // sameSite: "None",
        // maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).send("Logged Out!");
    }

    // Delete refreshToken in DB
    foundUser.refreshToken = foundUser.refreshToken.filter(
      (rt) => rt !== storedRefreshToken
    );
    await foundUser.save();

    res.clearCookie("tokens", {
      httpOnly: true,
      // secure: true,
      // sameSite: "None",
      // maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).send("Logged Out!");
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

module.exports = { logout };
const bcrypt = require("bcrypt");

const User = require("../../models/User");
const { createError } = require("../../errors/Error");
const { generateToken } = require("../../utils/token");
const { TOKEN_TYPE } = require("../../utils/constant");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = createError(400, "Email and Password are required!");
      next(err);
      return;
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      const err = createError(400, "Email is not registered!");
      next(err);
      return;
    }

    // verify password
    const verifiedPassword = await bcrypt.compare(password, foundUser.password);
    if (!verifiedPassword) {
      const err = createError(400, "Invalid id or password!");
      next(err);
      return;
    }

    const newRefreshToken = generateToken(
      foundUser,
      TOKEN_TYPE.REFRESH,
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_EXPIRY
    );

    const accessToken = generateToken(
      foundUser,
      TOKEN_TYPE.ACCESS,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRY
    );

    // refresh token swaping
    const storedRefreshToken = req?.cookies?.tokens?.refreshToken;
    const storedAccessToken = req?.cookies?.tokens?.accessToken;

    let newRefreshTokenArray = !storedRefreshToken
      ? foundUser?.refreshToken
      : foundUser?.refreshToken?.filter((rt) => rt !== storedRefreshToken);

    /* 
          Scenario added here: 
          1) User logs in but never uses RT and does not logout 
          2) RT is stolen
          3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
        */
    if (storedRefreshToken) {
      const foundTokenUser = await User.findOne({
        refreshToken: storedRefreshToken,
      });

      // Detected refresh token reuse!
      if (!foundTokenUser) {
        newRefreshTokenArray = [];
      }

      res.clearCookie("tokens", {
        httpOnly: true,
        // secure: true,
        // sameSite: "None",
        // maxAge: 24 * 60 * 60 * 1000,
      });
    }

    if (storedAccessToken) {
      res.clearCookie("tokens", {
        httpOnly: true,
        // secure: true,
        // sameSite: "None",
        // maxAge: 24 * 60 * 60 * 1000,
      });
    }

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();

    res
      .cookie(
        "tokens",
        {
          accessToken,
          refreshToken: newRefreshToken,
        },
        {
          httpOnly: true,
          // secure: true,
          // sameSite: "None",
          // maxAge: 24 * 60 * 60 * 1000,
        }
      )
      .status(200)
      .send(foundUser);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};


module.exports = { login }
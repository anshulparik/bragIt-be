const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const { createError } = require("../../errors/Error");
const { generateToken } = require("../../utils/token");
const { TOKEN_TYPE } = require("../../utils/constant");

const refreshToken = async (req, res, next) => {
  try {
    const storedRefreshToken = req?.cookies?.tokens?.refreshToken;
    res.clearCookie("tokens", {
      httpOnly: true,
      // secure: true,
      // sameSite: "None",
      // maxAge: 24 * 60 * 60 * 1000,
    });

    if (!storedRefreshToken) {
      const err = createError(401, "Unauthorized!");
      next(err);
      return;
    }

    const foundUser = await User.findOne({ refreshToken: storedRefreshToken });

    // Detected refresh token reuse!
    if (!foundUser) {
      jwt.verify(
        storedRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            const error = createError(403, "Forbidden!");
            next(error);
            return;
          }
          if (decoded) {
            const { user } = decoded;
            const hackedUser = await User.findOne({ email: user?.email });
            hackedUser.refreshToken = [];
            await hackedUser.save();
          }
        }
      );

      const err = createError(403, "Forbidden!");
      next(err);
      return;
    }

    let newRefreshTokenArray = foundUser?.refreshToken?.filter(
      (rt) => rt !== storedRefreshToken
    );

    // Checking for valid user
    jwt.verify(
      storedRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          foundUser.refreshToken = [...newRefreshTokenArray];
          await foundUser.save();

          const error = createError(403, "Forbidden!");
          next(error);
          return;
        }

        if (decoded) {
          const { user } = decoded;
          if (foundUser?.email !== user?.email) {
            const error = createError(403, "Forbidden!");
            next(error);
            return;
          }

          const newRefreshToken = generateToken(
            user,
            TOKEN_TYPE.REFRESH,
            process.env.REFRESH_TOKEN_SECRET,
            process.env.REFRESH_TOKEN_EXPIRY
          );

          const accessToken = generateToken(
            user,
            TOKEN_TYPE.ACCESS,
            process.env.ACCESS_TOKEN_SECRET,
            process.env.ACCESS_TOKEN_EXPIRY
          );

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
            .send("Refresh Token!");
        }
      }
    );
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

module.exports = { refreshToken };

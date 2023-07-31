const jwt = require("jsonwebtoken");
const { createError } = require("../errors/Error");

const verifyToken = (req, res, next) => {
  const accessToken = req?.cookies?.tokens?.accessToken;
  if (!accessToken) {
    const err = createError(401, "Unauthorized!");
    next(err);
    return;
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decode) => {
      if (err) {
        const error = createError(403, "Forbidden!");
        next(error);
        return;
      }

      if (decode) {
        const { user } = decode;
        req.user = user;
        next();
      }
    }
  );
};

module.exports = {
  verifyToken,
};

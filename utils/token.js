const jwt = require("jsonwebtoken");

const generateToken = (user, type, secret, expiry) => {
  const { id, username, email, role } = user;
  const token = jwt.sign(
    { user: { id, username, email, role }, type },
    secret,
    expiry && { expiresIn: expiry }
  );

  return token;
};

module.exports = {
  generateToken,
};

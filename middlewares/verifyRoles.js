const { createError } = require("../errors/Error");

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req?.user?.role;
    if (!role) {
      const err = createError(401, "Unauthorized!");
      next(err);
      return;
    }

    const rolesArray = [...allowedRoles];
    const allowAccess = rolesArray?.includes(role);
    if (!allowAccess) {
      const err = createError(401, "Unauthorized!");
      next(err);
      return;
    }

    next();
  };
};

module.exports = {
  verifyRoles,
};

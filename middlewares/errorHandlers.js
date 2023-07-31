const { createError } = require("../errors/Error");

const errorHandler = (err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  res.status(statusCode).send({
    success: false,
    message: err?.message || "Something went wrong!",
    stack: err?.stack,
  });
};

const notFoundHandler = (req, res, next) => {
  const err = createError(404, `Requested path ${req.path} not found`);
  next(err);
};

module.exports = { errorHandler, notFoundHandler };

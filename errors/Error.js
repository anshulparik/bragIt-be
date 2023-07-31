class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const createError = (statusCode, message) => {
  return new ApiError(statusCode, message);
};

module.exports = { ApiError, createError };

const TOKEN_TYPE = {
  REFRESH: "refresh",
  ACCESS: "access",
  LINK: "link",
};

const ROLES = {
  USER: "user",
  ADMIN: "admin",
  EDITOR: "editor",
};

const ACCOUNT_TYPE = {
  PUBLIC: "public",
  PRIVATE: "private",
};

const ALLOWED_ORIGINS = [
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3100",
  "http://localhost:3100",
  "http://localhost:3000",
];

module.exports = {
  TOKEN_TYPE,
  ROLES,
  ACCOUNT_TYPE,
  ALLOWED_ORIGINS,
};
